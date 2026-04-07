---
title: Cleanup Bundled SPA
status: pending
type: backend
depends_on:
  - unit-03-website-review-pages
---

# Cleanup Bundled SPA

Remove the bundled React SPA, legacy templates, and build infrastructure now that the website serves all review UI.

## Scope

- Delete `packages/haiku/review-app/` directory entirely (18 source files, Vite config, package.json, etc.)
- Delete `packages/haiku/src/review-app-html.ts` (auto-generated ~500KB inline SPA)
- Delete `packages/haiku/scripts/build-review-app.mjs` (Vite build + HTML inlining script)
- Delete `packages/haiku/src/templates/` directory (legacy server-rendered HTML: intent-review.ts, unit-review.ts, question-form.ts, design-direction.ts, annotation-canvas.ts, inline-comments.ts, components.ts, styles.ts, layout.ts, types.ts, index.ts, tailwind-generated.ts)
- Remove `REVIEW_APP_HTML` import and `serveSpa()` function from `http.ts` (if not already removed in unit-02)
- Update `packages/haiku/package.json`: remove review-app build scripts, Vite dev dependencies
- Update any CI/CD steps that build the review-app

## Completion Criteria

- [ ] `packages/haiku/review-app/` directory does not exist
- [ ] `packages/haiku/src/review-app-html.ts` does not exist
- [ ] `packages/haiku/src/templates/` directory does not exist
- [ ] `packages/haiku/scripts/build-review-app.mjs` does not exist
- [ ] `npm run build` in `packages/haiku/` succeeds without review-app build step
- [ ] No TypeScript compilation errors (no dangling imports)
- [ ] All three MCP tools (`open_review`, `ask_user_visual_question`, `pick_design_direction`) still function end-to-end via the website
