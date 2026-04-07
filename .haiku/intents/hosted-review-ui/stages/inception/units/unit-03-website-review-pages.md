---
title: Website Review Pages
status: pending
type: frontend
depends_on:
  - unit-02-upgrade-to-https
---

# Website Review Pages

Port the review-app React components to the Next.js website as client-rendered pages that connect to the local HTTPS server.

## Scope

- New Next.js routes (all `"use client"`, compatible with static export):
  - `website/app/review/[token]/page.tsx` — review UI
  - `website/app/question/[token]/page.tsx` — question form UI
  - `website/app/direction/[token]/page.tsx` — design direction picker UI
- Token decoding:
  - Decode URL-safe base64 token from route param → `{ port, sessionId }`
  - Connect to `https://local.haikumethod.ai:{port}/api/session/{sessionId}`
  - Establish WebSocket at `wss://local.haikumethod.ai:{port}/ws/session/{sessionId}`
- Port components from `packages/haiku/review-app/src/`:
  - `ReviewPage.tsx` → review page (intent tabs, unit view, stage states, knowledge, artifacts)
  - `QuestionPage.tsx` → question page (rendered options, multi-select, other field)
  - `DesignPicker.tsx` → direction page (archetype cards, parameter sliders)
  - `DecisionForm.tsx`, `AnnotationCanvas.tsx`, `InlineComments.tsx`, `CriteriaChecklist.tsx`, `MermaidDiagram.tsx`, `MarkdownViewer.tsx`, `StatusBadge.tsx`, `Card.tsx`, `Tabs.tsx`, `ThemeToggle.tsx`, `SubmitSuccess.tsx`
  - `useSession.ts` hook → adapt for cross-origin fetch + WebSocket
- Adapt for Next.js patterns:
  - Use existing website Tailwind config and design tokens
  - Integrate with website's ThemeProvider
  - Handle connection errors gracefully (cert unavailable, server not running)

## Completion Criteria

- [ ] Opening `https://haikumethod.ai/review/{valid-token}/` renders the review UI with data from local server
- [ ] Opening `https://haikumethod.ai/question/{valid-token}/` renders the question form
- [ ] Opening `https://haikumethod.ai/direction/{valid-token}/` renders the design direction picker
- [ ] Submitting a review decision via the website updates the local session (verified by MCP tool unblocking)
- [ ] Submitting question answers via the website returns answers to the MCP tool
- [ ] WebSocket connection works cross-origin (wss://local.haikumethod.ai → https://haikumethod.ai)
- [ ] Error state shown when local server is unreachable (not a blank page)
- [ ] `next build` (static export) succeeds with the new pages
- [ ] Annotation canvas (pin placement, inline comments) works on the hosted version

## Files to Create

- `website/app/review/[token]/page.tsx`
- `website/app/question/[token]/page.tsx`
- `website/app/direction/[token]/page.tsx`
- `website/app/components/review/` — ported components (ReviewPage, DecisionForm, etc.)
- `website/app/hooks/useLocalSession.ts` — session fetch + WebSocket hook for cross-origin
- `website/lib/token.ts` — token decode (shared logic with plugin)
