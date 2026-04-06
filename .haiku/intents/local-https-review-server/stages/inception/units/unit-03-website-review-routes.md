---
name: unit-03-website-review-routes
type: frontend
status: pending
depends_on: [unit-02-mcp-https-server]
bolt: 0
hat: ""
refs:
  - knowledge/DISCOVERY.md
---

# Website Review Routes

## Description
Add review page routes to the website that decode the token, fetch from the local HTTPS API, and render using shared components.

## Scope
- New route: `/review/{encoded}/` — decodes token, renders ReviewPage
- New route: `/review/{encoded}/question/` — renders QuestionPage
- New route: `/review/{encoded}/direction/` — renders DesignPicker
- `useLocalSession` hook — fetches from `https://local.haikumethod.ai:{port}/api/session/{id}`
- Move AnnotationCanvas, InlineComments, DecisionForm from `review-app/` to website
- Share components from `@haiku/shared`

## Completion Criteria
- [ ] Review pages render on the website with full functionality
- [ ] Inline text comments work (select text → add comment)
- [ ] Image annotation canvas works (pins, freehand drawing)
- [ ] Design direction picker works with previews and sliders
- [ ] Decision form submits back to local HTTPS API
- [ ] Tab auto-closes after submission
