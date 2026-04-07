---
studio: software
mode: continuous
status: active
created: 2026-04-07
---

# Hosted Review UI

Replace the bundled React review app (~515KB inlined SPA in `review-app-html.ts`) with a hosted architecture where the website serves the review UI and the local MCP server provides session data over HTTPS.

## Architecture

Follow the han local server pattern:

1. **DNS**: `local.haikumethod.ai` A record → `127.0.0.1`, AAAA → `::1`
2. **Cert provisioning**: Microservice at `certs.haikumethod.ai` serves short-lived Let's Encrypt wildcard certs for `*.local.haikumethod.ai`
3. **Local MCP HTTPS server**: On tool invocation, the MCP process serves session data over HTTPS using provisioned certs at `local.haikumethod.ai:{port}`
4. **Session encoding**: `urlsafe_base64({port}-{session-id})` encodes both the port and session into the URL
5. **Website route**: `haikumethod.ai/review/{encoded}` — the Next.js site decodes the param, fetches session data from `https://local.haikumethod.ai:{port}/api/session/{session-id}`, and renders the review UI
6. **No bundled React**: Remove `review-app/`, `review-app-html.ts`, and all inlined HTML generation

## Flow

```
Agent calls open_review MCP tool
  → MCP creates session, starts local HTTPS server
  → Encodes {port}-{session-id} as URL-safe base64
  → Opens https://haikumethod.ai/review/{encoded}
  → Website decodes, fetches from https://local.haikumethod.ai:{port}/api/session/{session-id}
  → Website renders review UI with session data
  → User decides → POST back to local MCP → tool returns result
```

## What Changes

- **Plugin**: Replace HTTP server with HTTPS (cert provisioning), strip bundled HTML, keep API endpoints + WebSocket
- **Website**: Add `/review/[encoded]/` route that decodes, fetches local session data, renders review UI
- **Infra**: Cert microservice, DNS records for `local.haikumethod.ai`
- **Remove**: `packages/haiku/review-app/`, `packages/haiku/src/review-app-html.ts`, `packages/haiku/scripts/build-review-app.mjs`
