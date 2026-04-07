---
title: HTTPS Local Server
type: backend
depends_on:
  - unit-01-dns-cert-infra
status: pending
hat: decomposer
---

# HTTPS Local Server

## Description

Upgrade the existing HTTP server in `packages/haiku/src/http.ts` from plain HTTP to HTTPS, using TLS certificates fetched from the cert-server deployed in unit-01.

### Changes to `packages/haiku/src/http.ts`

1. **TLS integration**: Replace `http.createServer()` with `https.createServer()` using certs fetched from the cert-server at startup. Cache the cert/key locally (filesystem) so the server can start even if cert-server is temporarily unreachable.

2. **CORS headers**: Add CORS middleware allowing `https://haikumethod.ai` as origin. Handle preflight `OPTIONS` requests. Required headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Credentials`.

3. **Remove HTML-serving routes**: Delete the `serveSpa()` function and the routes that serve the bundled SPA HTML:
   - `GET /review/:sessionId` (HTML)
   - `GET /question/:sessionId` (HTML)
   - `GET /direction/:sessionId` (HTML)

4. **Keep API + asset routes**: All JSON API endpoints, file-serving routes (mockups, wireframes, question images), and WebSocket remain.

5. **WebSocket over TLS**: The `upgrade` handler continues to work — `https.createServer()` supports the same `upgrade` event. WebSocket connections become `wss://` automatically.

6. **Cert refresh**: Implement periodic cert refresh (e.g., every 12 hours) to handle short-lived certificates. Use `server.setSecureContext()` to hot-swap certs without restarting.

### New file: `packages/haiku/src/certs.ts`

Cert-fetching logic:
- Fetch from cert-server URL (configurable via env var `HAIKU_CERT_SERVER_URL`)
- Cache to `~/.haiku/certs/local.haikumethod.ai.{cert,key}` with expiry metadata
- Return cached cert if valid and cert-server unreachable
- Export `getCertificates(): Promise<{cert: string, key: string}>`

## Completion Criteria

- [x] HTTPS server created with `node:https` `createServer()` using certs from cert-server — `http.ts` imports from `node:https`, passes `{cert, key}` to `createServer()`
- [x] CORS headers on all responses allowing `https://haikumethod.ai` — `withCors()` wraps every response in `handleRequest()`
- [x] SPA HTML-serving routes removed — `serveSpa()`, `handleReviewGet()`, `handleQuestionGet()`, `handleDirectionGet()` all deleted; no references to `REVIEW_APP_HTML`
- [x] WebSocket upgrade handler preserved for `wss://` — upgrade event works identically on `https.createServer()`
- [x] Cert caching in `~/.haiku/certs/` — `certs.ts` fetches from `/cert/latest`, caches cert/key/meta locally, returns cached if server unreachable
