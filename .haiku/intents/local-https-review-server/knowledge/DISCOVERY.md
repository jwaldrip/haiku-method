# Discovery: Local HTTPS Review Server

## Reference Architecture (han)

Han uses a cert-provisioned local HTTPS pattern:
- **Cert server** (`certs.han.guru`) provisions Let's Encrypt wildcard certs for `*.local.han.guru`
- **Local binary** fetches and caches certs at `~/.claude/han/certs/` with 6-day expiry and 2-day refresh threshold
- **HTTPS server** runs locally using the cached cert, so `coordinator.local.han.guru:{port}` is trusted by browsers
- **DNS**: `*.local.han.guru` resolves to 127.0.0.1 (and ::1 for IPv6)
- **Hot-reload**: Certs can refresh without restarting the server via `setSecureContext()`

## Our Adaptation

Same pattern for H·AI·K·U review pages:
- **Domain**: `local.haikumethod.ai` → 127.0.0.1 / ::1
- **Cert server**: `certs.haikumethod.ai/review/latest` — provisions wildcard for `*.local.haikumethod.ai`
- **Cache**: `~/.claude/haiku/certs/` with same TTL strategy
- **MCP binary**: Starts HTTPS on random port, serves JSON API only (no HTML)
- **Website**: `haikumethod.ai/review/{encoded}` renders the review UI

## Flow

```
1. Agent calls haiku MCP tool (open_review / ask_user_visual_question / pick_design_direction)
2. MCP creates a session with all data
3. MCP starts HTTPS server on random port (using cached cert for local.haikumethod.ai)
4. MCP encodes: urlsafe_base64("{port}-{sessionId}")
5. MCP opens: https://haikumethod.ai/review/{encoded}
6. Website decodes the token, extracts port + session ID
7. Website fetches: https://local.haikumethod.ai:{port}/api/session/{sessionId}
8. Website renders review page with shared components (same as browse)
9. User submits decision/answers
10. Website POSTs to: https://local.haikumethod.ai:{port}/api/session/{sessionId}/decide
11. MCP tool unblocks, returns the result to the agent
```

## What Changes

### Binary (shrinks ~450KB)
- Remove: `review-app/` Vite build, `review-app-html.ts`, Tailwind CSS bundling, `build-review-app.mjs`, `build-css.mjs`
- Add: TLS cert fetching/caching (~50 lines from han pattern), HTTPS server (replace HTTP), CORS headers for haikumethod.ai origin
- Keep: Session management, JSON API endpoints, blocking tool behavior

### Website (adds review routes)
- Add: `/review/{encoded}/` — new Next.js page that decodes token, fetches from local API
- Move: ReviewPage, QuestionPage, DesignPicker, AnnotationCanvas, InlineComments from `review-app/` to `website/app/review/`
- Share: Components already in `@haiku/shared` — StatusBadge, MarkdownViewer, CriteriaChecklist, etc.
- Add: `useLocalSession` hook — fetches session data from `local.haikumethod.ai:{port}`

### Infrastructure
- Deploy: Cert server (GCP Cloud Function or Cloud Run)
- DNS: `local.haikumethod.ai` A record → 127.0.0.1, AAAA → ::1
- DNS: `certs.haikumethod.ai` pointing to cert server

## Technical Risks

1. **CORS**: The website at `haikumethod.ai` fetches from `local.haikumethod.ai:{port}`. The MCP's HTTPS server must include `Access-Control-Allow-Origin: https://haikumethod.ai` headers.
2. **Mixed content**: Both website and local server must be HTTPS. The cert provisioning handles this.
3. **Cert availability**: If the cert server is down, the MCP falls back to HTTP (like han does). The website route would need to detect this and show an error.
4. **Port encoding**: The encoded token must be URL-safe and the port must be valid. Base64url encoding handles this.
5. **Firewall**: Local port must be accessible from the browser. Same-machine loopback should work universally.
