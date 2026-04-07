---
name: unit-02-mcp-https-server
type: backend
status: pending
depends_on: [unit-01-cert-infrastructure]
bolt: 0
hat: ""
refs:
  - knowledge/DISCOVERY.md
---

# MCP HTTPS Server

## Description
Replace the HTTP server in `packages/haiku/src/http.ts` with an HTTPS server that uses the provisioned cert.

## Scope
- Add TLS cert fetching/caching (port from han's `tls.ts` pattern)
- Cache certs at `~/.claude/haiku/certs/` with TTL and refresh
- Start HTTPS server on random port using cached cert
- Add CORS headers for `https://haikumethod.ai` and `https://haiku.jasonwaldrip.dev`
- JSON API only — remove all HTML serving
- Encode session URL: `urlsafe_base64("{port}-{sessionId}")`
- Open browser to `https://haikumethod.ai/review/{encoded}`

## Completion Criteria
- [ ] HTTPS server starts with valid TLS cert on random port
- [ ] CORS allows requests from haikumethod.ai origin
- [ ] `/api/session/{id}` returns session JSON over HTTPS
- [ ] POST endpoints accept decisions/answers over HTTPS
- [ ] Graceful fallback to HTTP if certs unavailable
- [ ] Browser opens the website URL with encoded token
