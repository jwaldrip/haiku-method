---
name: unit-04-strip-bundled-spa
type: backend
status: pending
depends_on: [unit-03-website-review-routes]
bolt: 0
hat: ""
refs:
  - knowledge/DISCOVERY.md
---

# Strip Bundled SPA from Binary

## Description
Remove the React review SPA from the binary now that the website hosts the review pages.

## Scope
- Delete `packages/haiku/review-app/` directory
- Remove `build-review-app.mjs` and `build-css.mjs` scripts
- Remove `review-app-html.ts` generated file
- Remove Tailwind build step from package.json
- Remove `REVIEW_APP_HTML` import from http.ts
- Update http.ts to serve 404 for HTML routes (only JSON API remains)
- Verify binary size reduction (~450KB saved)

## Completion Criteria
- [ ] `review-app/` directory deleted
- [ ] Binary size < 600KB (was ~1MB)
- [ ] All review MCP tools still work (open_review, ask_user_visual_question, pick_design_direction)
- [ ] JSON API endpoints still functional
- [ ] No Tailwind or React dependencies in packages/haiku
