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
| HTTPS | Let's Encrypt, issued and renewed by Coolify's proxy |

Later phases add `arcdev-api` and a PostgreSQL database **inside the same ArcDev project**, so everything for this client stays in one place.

## 2. DNS at Cloudflare

| Type | Name | Content | Proxy |
|---|---|---|---|
| `A` | `@` | `194.233.85.160` | DNS only |
| `CNAME` | `www` | `arcdevltd.com` | DNS only |

Keep the proxy **off** (grey cloud). With it on, Coolify cannot obtain the HTTPS certificate.

`www.arcdevltd.com` and plain `http://` both redirect to `https://arcdevltd.com`.

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
