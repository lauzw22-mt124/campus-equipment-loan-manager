# Running and deploying

## Option 1 — local practice with temporary MongoDB

Use Node.js 22 and `npm ci && npm run demo`. MongoDB 7.0.24 is downloaded on first start; data is removed when the process exits. The server binds to `127.0.0.1:8099`. This is the quickest self-contained practice setup.

On Ubuntu 22.04/24.04 install Node.js 22 from an official supported distribution, then verify `node --version`. MongoDB's binary needs OpenSSL 3 and libcurl. If startup reports missing libraries, install the matching Ubuntu packages (for example `libcurl4` on 22.04 or `libcurl4t64` on 24.04). Run `npm test` and the full rehearsal on the actual presentation machine in advance.

## Option 2 — persistent Docker Compose

Requires Docker Engine/Desktop and Compose v2. Containers run the same source and a single-node MongoDB replica set. The database volume persists and the app port is bound to loopback. Docker is optional and is not needed for `npm run demo`.

```bash
cp .env.example .env
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
# Put the generated secret in .env and set your own ADMIN_PASSWORD (12+ characters).
docker compose up -d --build
docker compose exec app npm run seed
docker compose logs --tail=50 app
```

Open `http://127.0.0.1:8099`. Compose overrides the app's MongoDB URI with the internal `mongo` hostname. The MongoDB health check initiates `rs0` and waits for a primary. The normal server uses MongoDB-backed sessions. If you open the login page before seeding, no login account exists yet.

`docker compose down` stops containers while retaining data. Removing the `mongo-data` volume destroys that local database; do not do it unless intentionally resetting disposable data. The compose setup is a local development environment, without database authentication, and does not publish MongoDB's port.

## Option 3 — MongoDB Atlas and a Node cloud host

1. Create a dedicated Atlas deployment/database user and allow the actual application host's network access. Use a replica-set connection string supplied by Atlas.
2. Configure the app host for Node.js 22. Install with `npm ci --omit=dev`; start with `npm start`.
3. Set `MONGODB_URI`, a random `SESSION_SECRET` of at least 32 characters, `ADMIN_USERNAME`, a strong `ADMIN_PASSWORD`, `HOST=0.0.0.0`, and the platform's port.
4. Run `npm run seed` once against this database. It is safe to repeat for missing sample records; it does not reset an existing account.
5. Serve through HTTPS. Set `NODE_ENV=production`; this turns on secure cookies. If there is exactly one trusted HTTPS reverse proxy, set `TRUST_PROXY=true`. Otherwise configure the trust boundary deliberately in `app.js`.
6. Set `API_AUTH_REQUIRED=true` for public hosting. The authenticated curl procedure in `API.md` still demonstrates all methods. The default false is for the course's local unauthenticated API demonstration.
7. Verify `/health`, login/logout, persistence after restart, web CRUD, loans and the curl script. Configure the platform to restart on failure.

No cloud service, account or paid deployment is created by these files. Do not put production credentials in GitHub or the submission ZIP.

## Environment settings

| Name                               | Meaning                                                        |
| ---------------------------------- | -------------------------------------------------------------- |
| `PORT`                             | HTTP port; default 8099.                                       |
| `HOST`                             | Bind address; default 127.0.0.1.                               |
| `MONGODB_URI`                      | Required for normal server/seed; transaction-capable database. |
| `SESSION_SECRET`                   | Random session signing secret; minimum 32 characters.          |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Used by the seed command only.                                 |
| `NODE_ENV`                         | Production enables secure cookies; requires HTTPS.             |
| `TRUST_PROXY`                      | Literal true trusts one reverse proxy. Default false.          |
| `API_AUTH_REQUIRED`                | Literal true requires an authenticated session for JSON APIs.  |
| `MONGOMS_DOWNLOAD_DIR`             | Optional local MongoDB binary cache for demo/tests.            |

## Troubleshooting

- **Standalone MongoDB rejected:** switch to Atlas or the supplied replica-set setup.
- **Cannot sign in:** run seed against the same database used by the server; existing passwords are not replaced by seed.
- **Login succeeds but redirects back:** a secure cookie cannot work over plain HTTP. Use HTTPS in production; use development mode only for local HTTP.
- **409 on deleting equipment:** it is borrowed, under maintenance, or has history. Create an unused asset for the Delete demonstration.
- **Port in use:** select another `PORT` and pass the same base URL to the curl script.
- **MongoDB binary download fails:** confirm outbound HTTPS access; run the first download before class or use a persistent database instead.

Docker/cloud steps are provided as deployment instructions; validate them on the final chosen platform. A local macOS test alone does not establish compliance with the required Ubuntu/cloud presentation environment.
