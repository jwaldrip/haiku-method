# Discovery: Hosted Review UI

## Domain Model

| Entity | Description |
|--------|-------------|
| **Session** | In-memory object (review, question, design_direction) created by MCP tool, identified by UUID, TTL 30m |
| **Token** | URL-safe base64 encoding of `{port}-{session_id}`, embedded in website URL |
| **Local HTTPS Server** | TLS-enabled HTTP+WebSocket server running alongside MCP process, serves session API |
| **Cert Service** | Microservice that provisions Let's Encrypt certs for `local.haikumethod.ai` via DNS-01 challenge |
| **Website Review Routes** | Next.js client-rendered pages that decode tokens, fetch from local HTTPS server, render UI |

## Technical Landscape

### What Exists (Plugin Side)

- `packages/haiku/src/http.ts` — HTTP server (772 lines): session API, review/question/direction routes, mockup/wireframe serving, RFC 6455 WebSocket implementation. Uses `node:http` with Web API Request/Response adapter.
- `packages/haiku/src/sessions.ts` — In-memory session store (234 lines): EventEmitter-based blocking (`waitForSession`), TTL eviction, typed session interfaces (ReviewSession, QuestionSession, DesignDirectionSession).
- `packages/haiku/src/server.ts` — MCP tool handlers: `open_review` (lines 395-622), `ask_user_visual_question` (lines 717-816), `pick_design_direction` (lines 818-863). Each creates a session, starts HTTP server, spawns browser to `http://127.0.0.1:{port}/{type}/{session_id}`, blocks via `waitForSession()`.
- `packages/haiku/review-app/` — Bundled React SPA (18 source files): Vite build, Tailwind CSS, components for ReviewPage, QuestionPage, DesignPicker, AnnotationCanvas, InlineComments, MermaidDiagram, CriteriaChecklist.
- `packages/haiku/src/review-app-html.ts` — Auto-generated inline SPA constant (~500KB+), built by `scripts/build-review-app.mjs` which inlines all CSS/JS into a single HTML string.
- `packages/haiku/src/templates/` — Legacy server-rendered HTML templates (intent-review.ts, unit-review.ts, etc.). Not actively used by SPA but exist as fallback.

### What Exists (Website Side)

- `website/` — Next.js 15 App Router, static export (`output: "export"` in prod, full Next.js in dev).
- Already has client-rendered interactive components (workflow visualizer, mode selector, mermaid diagrams).
- Uses Tailwind CSS, same design system the review-app uses.
- Deployed via GitHub Pages on push to main.

### What Exists (Infrastructure)

- `deploy/terraform/` — GCP Cloud DNS for `haikumethod.ai`, managed zone with modular records.
- Already has patterns for subdomains (mcp.haikumethod.ai CNAME, auth-proxy subdomain).
- Auth proxy module: GCP Cloud Function for OAuth flows — potential pattern for cert service.

### Han Pattern (Reference Architecture)

- Domain `coordinator.local.han.guru` DNS-resolves to 127.0.0.1 / ::1.
- Cert server at `certs.han.guru` (Railway): fetches Let's Encrypt 6-day certs via certbot + Google Cloud DNS.
- Local coordinator: fetches certs on startup (5s timeout), caches at `~/.claude/han/certs/`, hot-reloads via `server.setSecureContext()`.
- Dashboard (hosted on Railway) connects back to `https://coordinator.local.han.guru:41957/graphql`.

## Architecture Decision

### Approach

Mirror the han pattern adapted for haikumethod.ai:

1. **DNS**: Add `local.haikumethod.ai` A record → 127.0.0.1, AAAA record → ::1 in GCP Cloud DNS.
2. **Cert Service**: Deploy a microservice that provisions Let's Encrypt certs for `local.haikumethod.ai` via DNS-01 challenge against GCP Cloud DNS. Serve via `GET /certs/latest`. Can deploy on Railway (like han) or as GCP Cloud Function.
3. **Local Server**: Upgrade `http.ts` from `node:http` to `node:https` (or `node:tls` wrapping). Fetch certs from cert service on startup, cache at `~/.haiku/certs/`. Add CORS headers for `https://haikumethod.ai` origin.
4. **Token Encoding**: `urlsafe_base64({port}-{session_id})` — simple, no secrets needed since the session_id is already a UUID.
5. **Website Routes**: Add `/review/[token]/`, `/question/[token]/`, `/direction/[token]/` pages. Fully client-rendered (compatible with static export). Decode token, connect to `https://local.haikumethod.ai:{port}`, render UI.
6. **Component Migration**: Port review-app React components to website. They already use React + Tailwind — mostly a move with Next.js adaptation (no SSR needed for these pages).

### Key Constraints

- **Static export**: Website review pages must be fully client-rendered (`"use client"`). No server-side data fetching. This is fine — the data source is the local server, only reachable from the client's browser.
- **Port is dynamic**: OS-assigned port varies per session. TLS certs are domain-based, not port-specific, so this is not an issue.
- **CORS**: Browser enforces same-origin policy. Local server must respond to preflight OPTIONS requests with `Access-Control-Allow-Origin: https://haikumethod.ai`.
- **Mixed content**: Not an issue — both origins are HTTPS.
- **Cert fallback**: If cert service is unreachable, fall back to plain HTTP on localhost (degraded mode, same as current behavior).

### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Cross-origin WebSocket may be blocked by browser | Medium | Test early; browsers generally allow cross-origin WS if server accepts the Origin header |
| Cert service downtime blocks HTTPS | Low | Cert caching (only refetch when expired); fallback to HTTP |
| Static export limits review page capabilities | Low | These pages are inherently client-rendered; static export is not a constraint |
| Port conflicts or firewall blocks | Low | OS-assigned port 0 avoids conflicts; same risk profile as current HTTP approach |
