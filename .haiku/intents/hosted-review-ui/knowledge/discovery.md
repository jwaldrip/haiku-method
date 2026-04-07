---
type: discovery
created: 2026-04-07
---

# Hosted Review UI — Discovery

## Domain Model

### Current Architecture

```
Agent calls open_review/ask_user_visual_question/pick_design_direction
  → MCP creates in-memory session (sessions.ts)
  → Starts HTTP server on 127.0.0.1:{random-port} (http.ts)
  → Serves bundled React SPA (~515KB inlined in review-app-html.ts)
  → Browser opens http://127.0.0.1:{port}/review/{session-id}
  → SPA fetches /api/session/{id}, renders UI
  → User submits decision → POST → session updated → tool returns
```

**Problems:**
- ~515KB React SPA inlined in TypeScript string constant (review-app-html.ts)
- Build step required (build-review-app.mjs → Vite → inline)
- Duplicates rendering infra between plugin binary and website
- HTTP only (no TLS) — browsers increasingly restrict mixed content

### Target Architecture (han pattern)

```
Agent calls MCP tool
  → MCP creates session, starts HTTPS server on 0.0.0.0:{port}
  → Encodes urlsafe_base64("{port}-{session-id}")
  → Opens https://haikumethod.ai/review/{encoded}
  → Website decodes → fetches https://local.haikumethod.ai:{port}/api/session/{id}
  → Website renders review UI with session data
  → User submits → POST to local HTTPS → session updated → tool returns
```

**Key components:**
1. DNS: `local.haikumethod.ai` A → 127.0.0.1, AAAA → ::1
2. Cert microservice: `certs.haikumethod.ai` provisions Let's Encrypt wildcards for `*.local.haikumethod.ai`
3. MCP HTTPS server: fetches/caches certs, serves session API + WebSocket + file assets
4. Website route: `/review/[encoded]/` decodes, fetches local data, renders UI
5. Remove: review-app/, review-app-html.ts, build-review-app.mjs

## Technical Landscape

### MCP Server (packages/haiku/)

- **http.ts** (790 lines): HTTP server on 127.0.0.1, routes for /api/session, /review, /question, /direction, /mockups, /wireframe, WebSocket upgrade handler. Uses `node:http` createServer.
- **sessions.ts** (241 lines): In-memory session store (Map), event emitter for blocking waits, 30-min TTL, max 100 sessions. Three session types: review, question, design_direction.
- **review-app-html.ts**: Generated file containing entire React SPA as string constant (~515KB).
- **scripts/build-review-app.mjs**: Vite build script that inlines all assets into review-app-html.ts.
- **review-app/**: Vite + React + TypeScript SPA source:
  - Components: ReviewPage, QuestionPage, DesignPicker, MermaidDiagram, AnnotationCanvas, etc.
  - Hooks: useSession (fetches /api/session/:id)
  - Routing: URL path parsing for /review/:id, /question/:id, /direction/:id
- **server.ts**: MCP tool handlers (open_review, ask_user_visual_question, pick_design_direction) that create sessions, start HTTP server, open browser.

### Website (website/)

- Next.js 15 App Router, static export (`output: "export"`)
- Deployed to GitHub Pages at haikumethod.ai
- No existing review route — review is currently local-only
- Has Tailwind CSS, existing component library

### Han Reference (../han/)

- Cert server: Bun.ts microservice on Railway at `certs.han.guru`
- Let's Encrypt with 6-day short-lived certs via Google Cloud DNS
- Endpoint: `GET /coordinator/latest` returns `{cert, key, expires, domain}`
- Local daemon: Rust, fetches certs, caches in `~/.claude/han/certs/`
- Domain: `coordinator.local.han.guru` → A record 127.0.0.1
- Dashboard: hosted React app at `dashboard.local.han.guru`, connects to local HTTPS coordinator

### Cross-Origin Considerations

- Website at `haikumethod.ai` will fetch from `local.haikumethod.ai:{port}`
- Requires CORS headers on the local HTTPS server
- WebSocket connections also cross-origin (WSS)
- Static export means all review rendering is client-side (no SSR for local data)

### Session Encoding

- Format: `urlsafe_base64("{port}-{session-id}")`
- Example: port=54321, session=abc-123 → base64url("54321-abc-123")
- Website decodes to extract port and session ID
- All three session types (review, question, design_direction) use same encoding

## Overlap Check

No active H·AI·K·U branches found — this intent has no file overlap conflicts.
