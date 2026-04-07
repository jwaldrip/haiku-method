---
type: frontend
status: pending
depends_on:
  - unit-02-https-local-server
quality_gates:
  - "Route /review/[encoded]/ renders in static export (next build succeeds)"
  - "Decoding base64url param extracts correct port and session-id"
  - "Client-side fetch to https://local.haikumethod.ai:{port}/api/session/{id} returns session data"
  - "ReviewPage renders intent review with all fields (metadata, units, DAG, criteria, mockups)"
  - "QuestionPage renders questions with options and submits answers"
  - "DesignPicker renders archetypes and parameters and submits selection"
  - "WebSocket connection (wss://local.haikumethod.ai:{port}/ws/session/{id}) receives events"
  - "Decision/answer POST submits to correct local HTTPS endpoint"
  - "Connection error shows helpful message (e.g. 'MCP server not running')"
---

# Unit 03: Website Review Pages

Add review/question/direction pages to the Next.js website that decode the session URL and render the review UI using data from the local MCP server.

## Scope

### New Route: /review/[encoded]/
- Dynamic route: `website/app/review/[encoded]/page.tsx`
- Client component (`"use client"`) — cannot SSR/SSG local data
- Decode `encoded` param: `Buffer.from(encoded, "base64url").toString()` → split to get port + session-id
- Fetch session data from `https://local.haikumethod.ai:{port}/api/session/{session-id}`
- Route to correct UI based on `session_type` field: review → ReviewPage, question → QuestionPage, design_direction → DesignPicker

### Port Review Components
Move from `packages/haiku/review-app/src/components/` to `website/app/review/components/`:
- ReviewPage.tsx (intent/unit review with metadata, DAG, criteria, mockups)
- QuestionPage.tsx (visual question form)
- DesignPicker.tsx (archetype selection + parameter sliders)
- MermaidDiagram.tsx (DAG visualization)
- AnnotationCanvas.tsx (pin/comment annotations)
- DecisionForm.tsx (approve/request changes + feedback)
- CriteriaChecklist.tsx, Card.tsx, StatusBadge.tsx, Tabs.tsx, MarkdownViewer.tsx, InlineComments.tsx, SubmitSuccess.tsx
- ThemeToggle.tsx (adapt to website's existing theme system if any)

### Port Hooks
- useSession.ts → adapt to fetch from `https://local.haikumethod.ai:{port}/api/session/{id}` 
- WebSocket hook → connect to `wss://local.haikumethod.ai:{port}/ws/session/{id}`

### Adapt to Next.js
- Replace Vite-specific patterns with Next.js equivalents
- Use website's existing Tailwind config
- Handle connection failures gracefully (MCP not running, wrong port, expired session)

### Key Files
- New: `website/app/review/[encoded]/page.tsx`
- New: `website/app/review/components/` (ported from review-app)
- New: `website/app/review/hooks/` (ported + adapted)
