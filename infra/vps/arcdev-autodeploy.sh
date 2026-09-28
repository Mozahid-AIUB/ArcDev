#!/bin/sh
# Safety net for Coolify's GitHub push webhook, which sometimes never arrives.
#
# Every minute: if the latest commit on GitHub main has no deployment in Coolify after a
# grace period (the webhook's chance), queue one the same way the webhook would, through
# Coolify's own queue_application_deployment(). The repo is public, so no token is needed.
# Respects the app's "auto deploy" switch and its watch paths, so it never deploys a commit
# the webhook would have skipped.
set -u

APP_UUID=cx6e9ns5xwgqr2gdwpwsmfyr
REPO=Mozahid-AIUB/ArcDev
BRANCH=main
GRACE=${GRACE:-180}
STATE=/var/lib/arcdev-autodeploy
LOG=/var/log/arcdev-autodeploy.log

exec 9>/run/arcdev-autodeploy.lock
flock -n 9 || exit 0
mkdir -p "$STATE"

log() { echo "$(date -u +%FT%TZ) $*" >> "$LOG"; }
db() { docker exec coolify-db psql -U coolify -d coolify -t -A -c "$1" 2>/dev/null; }

sha=$(timeout 20 git ls-remote "https://github.com/$REPO.git" "refs/heads/$BRANCH" 2>/dev/null | cut -f1)
case "$sha" in
  [0-9a-f][0-9a-f][0-9a-f][0-9a-f]*) ;;
  *) exit 0 ;; # GitHub unreachable this minute; try again next time.
esac

[ "$(cat "$STATE/handled" 2>/dev/null)" = "$sha" ] && exit 0

app_id=$(db "SELECT id FROM applications WHERE uuid = '$APP_UUID';")
[ -n "$app_id" ] || exit 0

known=$(db "SELECT count(*) FROM application_deployment_queues WHERE application_id = '$app_id' AND commit = '$sha';")
if [ "${known:-0}" != "0" ]; then
  echo "$sha" > "$STATE/handled"
  rm -f "$STATE/pending"
  exit 0
fi

# First sighting of an undeployed commit starts the webhook's grace period.
now=$(date +%s)
if [ "$(cut -d' ' -f1 "$STATE/pending" 2>/dev/null)" != "$sha" ]; then
  echo "$sha $now" > "$STATE/pending"
  exit 0
fi
since=$(cut -d' ' -f2 "$STATE/pending")
[ $((now - since)) -ge "$GRACE" ] || exit 0

last=$(db "SELECT commit FROM application_deployment_queues WHERE application_id = '$app_id' AND status = 'finished' ORDER BY created_at DESC LIMIT 1;")

result=$(docker exec -e APP_UUID="$APP_UUID" -e REPO="$REPO" -e SHA="$sha" -e LAST="$last" coolify \
  php artisan tinker --execute='
$app = App\Models\Application::where("uuid", getenv("APP_UUID"))->firstOrFail();
if (! $app->isDeployable()) { echo "SKIP auto-deploy is off"; return; }
$sha = getenv("SHA");
$last = getenv("LAST");
if (! blank($app->watch_paths) && $last) {
    $compare = Illuminate\Support\Facades\Http::timeout(15)
        ->withHeaders(["Accept" => "application/vnd.github+json"])
        ->get("https://api.github.com/repos/" . getenv("REPO") . "/compare/{$last}...{$sha}");
    if ($compare->ok() && ! $app->isWatchPathsTriggered(collect($compare->json("files"))->pluck("filename"))) {
        echo "SKIP no watched files changed";
        return;
    }
}
$result = queue_application_deployment(
    application: $app,
    deployment_uuid: new_public_id(),
    commit: $sha,
    force_rebuild: false,
    is_webhook: true,
);
echo "QUEUED " . json_encode($result);
' 2>&1 | tail -n 1)

case "$result" in
  QUEUED*|SKIP*)
    echo "$sha" > "$STATE/handled"
    rm -f "$STATE/pending"
    log "$sha webhook missed it; $result"
    ;;
  *)
    log "$sha could not queue: $result"
    ;;
esac

# Keep the log short.
tail -n 300 "$LOG" > "$LOG.tmp" 2>/dev/null && mv "$LOG.tmp" "$LOG"
