# ArcDev — Deployment

Version 1 · 17 September 2026

How the live site is hosted, how a change reaches it, and where to look when something breaks.

---

## 1. Where it runs

| Piece | Value |
|---|---|
| Domain | `arcdevltd.com`, registered and DNS-managed at Cloudflare |
| Server | VPS `194.233.85.160` (Ubuntu 24.04), shared with other client projects |
| Deploy panel | Coolify — https://coolify.mozahidulislam.pro.bd |
| Coolify project | **ArcDev** — only ArcDev resources go in here |
| Environment | `production` |
| Application | `arcdev-website` (uuid `cx6e9ns5xwgqr2gdwpwsmfyr`) |
| Source | GitHub `Mozahid-AIUB/ArcDev`, branch `main`, via the `mozahid-a-i-u-b` GitHub App |
| Build | Dockerfile at `infra/docker/web.Dockerfile`, build context is the repo root |
| Port | Container listens on 3000; only Coolify's proxy can reach it |
| HTTPS | Cloudflare certificate for visitors. Cloudflare → server uses the proxy's self-signed certificate (SSL mode **Full**) |

Later phases add `arcdev-api` and a PostgreSQL database **inside the same ArcDev project**, so everything for this client stays in one place.

## 2. DNS at Cloudflare

| Type | Name | Content | Proxy |
|---|---|---|---|
| `A` | `@` | `194.233.85.160` | Proxied |
| `CNAME` | `www` | `arcdevltd.com` | Proxied |

Traffic goes through Cloudflare (served from its Dhaka edge), which is fast for visitors in Bangladesh.

`www.arcdevltd.com` and plain `http://` both redirect to `https://arcdevltd.com`.

**Before the webapp launches (logins, payments):** switch SSL/TLS to **Full (strict)**. Today Cloudflare encrypts the connection to the server but does not verify its certificate. To fix it:

1. Cloudflare → SSL/TLS → Origin Server → **Create Certificate** for `arcdevltd.com` and `*.arcdevltd.com`.
2. Install that certificate for the ArcDev domains in Coolify's proxy.
3. Set SSL/TLS mode to **Full (strict)** and confirm the site still loads.

Also consider a Cloudflare **Redirect Rule** for `www` → `arcdevltd.com` with status 301. Today the proxy uses 302, which search engines treat as temporary.

## 3. How a change goes live

1. Push to `main` on GitHub.
2. Coolify deploys automatically, **but only if the push touches the website**:
   `apps/web/**`, `packages/**`, `infra/docker/web.Dockerfile`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `turbo.json`, `.dockerignore`.
   Pushes that only change `docs/` or other apps do not redeploy the website.
3. The build takes about two minutes. The old container keeps serving until the new one is up.

To deploy by hand: Coolify → ArcDev → production → arcdev-website → **Deploy**.

## 4. Environment variables

Set in Coolify → arcdev-website → **Environment Variables**. Redeploy after changing them.

| Variable | Needed | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Defaults to `https://arcdevltd.com`. Mark as a **build** variable if set: it is baked in at build time |
| `NEXT_PUBLIC_ALLOW_INDEXING` | **Only at launch** | Leave unset while the site shows sample content, so it stays out of Google. Set to `true` (as a **build** variable) once the client has approved real content, then redeploy |
| `REQUEST_EMAIL_TO` | **Yes, before launch** | Office inbox that receives website requests |
| `REQUEST_EMAIL_FROM` | Yes | Sender address, usually the same mailbox as `SMTP_USER` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | **Yes, before launch** | Without these the live site refuses form requests and asks the visitor to call instead |

## 5. When something breaks

| Symptom | Look at |
|---|---|
| Deploy failed | Coolify → arcdev-website → **Deployments** → open the failed one for the build log |
| Site shows "no available server" or 503 | The container stopped: Coolify → arcdev-website → **Logs**, then Redeploy |
| Certificate warning in the browser | DNS record missing, or Cloudflare proxy switched on |
| Form says the request couldn't be sent | SMTP variables missing or wrong: check the container logs for `Could not email the request` |

To build the image locally the same way Coolify does:

```bash
docker build -f infra/docker/web.Dockerfile -t arcdev-web .
docker run --rm -p 3000:3000 arcdev-web
```

## 6. Access

- Coolify API tokens are created for a single job and deleted afterwards. None are stored in this repository.
- Server SSH access uses the `myvps` host entry on the developer's machine. Never commit keys.
