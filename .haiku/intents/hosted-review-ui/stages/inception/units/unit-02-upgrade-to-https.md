---
title: Upgrade Local Server to HTTPS
status: pending
type: backend
depends_on:
  - unit-01-dns-and-cert-service
---

# Upgrade Local Server to HTTPS

Convert the local HTTP server to HTTPS using certs from the cert service. Add CORS support and URL token encoding so the website can connect.

## Scope

- Cert management in plugin:
  - Fetch certs from cert service on server startup (with timeout + fallback to HTTP)
  - Cache certs at `~/.haiku/certs/` (cert, key, metadata with expiry)
  - Hot-reload certs via `server.setSecureContext()` when approaching expiry
- Upgrade `http.ts`:
  - Switch from `node:http.createServer` to `node:https.createServer` with fetched TLS options
  - Graceful fallback: if certs unavailable, start plain HTTP (current behavior)
  - Add CORS headers on all responses: `Access-Control-Allow-Origin: https://haikumethod.ai`
  - Handle preflight OPTIONS requests
  - Bind to `0.0.0.0` (or keep `127.0.0.1`) — both work since DNS resolves to loopback
- Token encoding:
  - Add `encodeSessionToken(port, sessionId)` → URL-safe base64 of `{port}-{session_id}`
  - Add `decodeSessionToken(token)` → `{ port, sessionId }`
  - Export decode function for use by website (shared package or inline)
- Update MCP tool handlers in `server.ts`:
  - `open_review`: open `https://haikumethod.ai/review/{token}/` instead of `http://127.0.0.1:{port}/review/{sessionId}`
  - `ask_user_visual_question`: open `https://haikumethod.ai/question/{token}/`
  - `pick_design_direction`: open `https://haikumethod.ai/direction/{token}/`
- Remove SPA serving from `http.ts` — server only serves API routes + WebSocket

## Completion Criteria

- [ ] Local server starts with TLS when certs are available: `curl -k https://local.haikumethod.ai:{port}/api/session/{id}` returns session JSON
- [ ] Falls back to HTTP when certs unavailable (existing behavior preserved)
- [ ] CORS preflight: `curl -X OPTIONS -H "Origin: https://haikumethod.ai" https://local.haikumethod.ai:{port}/api/session/test` returns appropriate CORS headers
- [ ] `encodeSessionToken(54321, "abc-123")` produces valid URL-safe base64 that `decodeSessionToken()` round-trips
- [ ] MCP tools open `haikumethod.ai` URLs instead of localhost URLs
- [ ] Server no longer serves SPA HTML on GET /review/:id (returns 404 or redirect)

## Files to Modify

- `packages/haiku/src/http.ts` — HTTPS upgrade, CORS, remove SPA serving
- `packages/haiku/src/server.ts` — URL generation changes in tool handlers
- New: `packages/haiku/src/certs.ts` — cert fetch, cache, refresh logic
- New: `packages/haiku/src/token.ts` — encode/decode session tokens
