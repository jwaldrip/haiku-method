---
type: backend
status: pending
depends_on:
  - unit-01-cert-microservice
quality_gates:
  - "MCP server starts HTTPS listener (not HTTP) verified by curl --resolve local.haikumethod.ai:{port}:127.0.0.1 https://local.haikumethod.ai:{port}/api/session/{id}"
  - "Cert fetch from certs.haikumethod.ai succeeds and certs are cached locally"
  - "Self-signed fallback works when cert service is unreachable"
  - "CORS headers present on API responses for origin https://haikumethod.ai"
  - "Session URL encoding produces valid urlsafe base64 of {port}-{session-id}"
  - "open_review/ask_user_visual_question/pick_design_direction tools open https://haikumethod.ai/review/{encoded} URL"
  - "WebSocket upgrade works over TLS (wss://)"
  - "Mockup and wireframe file-serving endpoints still work over HTTPS"
---

# Unit 02: HTTPS Local Server + Session Encoding

Convert the MCP HTTP server to HTTPS with cert provisioning, add CORS support, and implement session URL encoding.

## Scope

### HTTPS Conversion (http.ts)
- Replace `node:http` createServer with `node:https` (or `node:tls` wrapping)
- Fetch certs from `certs.haikumethod.ai/haiku/latest` on startup, cache in `~/.haiku/certs/`
- Self-signed fallback via `node:crypto` if cert service unreachable
- Listen on `0.0.0.0:{port}` (not just 127.0.0.1) since DNS resolves to loopback anyway
- Add CORS headers for `https://haikumethod.ai` origin on all API responses
- WebSocket upgrade handler must work over TLS

### Session URL Encoding
- Encode: `Buffer.from("{port}-{session-id}").toString("base64url")`
- Decode: `Buffer.from(encoded, "base64url").toString().split("-", 2)` (first segment = port, rest = session-id)

### Tool URL Changes (server.ts)
- `open_review`: open `https://haikumethod.ai/review/{encoded}` instead of `http://127.0.0.1:{port}/review/{session-id}`
- `ask_user_visual_question`: open `https://haikumethod.ai/review/{encoded}` (question type detected from session data)
- `pick_design_direction`: open `https://haikumethod.ai/review/{encoded}` (direction type detected from session data)

### Remove SPA Serving
- Delete `serveSpa()` function
- Remove GET routes for `/review/:id`, `/question/:id`, `/direction/:id` (HTML serving)
- Keep all `/api/` routes, POST routes, file-serving routes, and WebSocket

### Key Files
- Modify: `packages/haiku/src/http.ts`
- Modify: `packages/haiku/src/server.ts`
- New: `packages/haiku/src/tls.ts` (cert fetch/cache/fallback)
- Remove: import of `review-app-html.ts` from http.ts
