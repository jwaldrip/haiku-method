---
type: backend
status: pending
depends_on:
  - unit-03-website-review-pages
quality_gates:
  - "packages/haiku/review-app/ directory no longer exists"
  - "packages/haiku/src/review-app-html.ts no longer exists"
  - "packages/haiku/scripts/build-review-app.mjs no longer exists"
  - "No imports of review-app-html anywhere in codebase (grep returns empty)"
  - "package.json build scripts no longer reference review app build step"
  - "npm run build / tsup succeeds without review app"
  - "Plugin binary size decreased (no inlined SPA)"
---

# Unit 04: Remove Bundled SPA

Delete the bundled React review app and its build infrastructure now that reviews are served by the website.

## Scope

### Delete Files
- `packages/haiku/review-app/` (entire directory — Vite config, React source, deps)
- `packages/haiku/src/review-app-html.ts` (generated ~515KB string constant)
- `packages/haiku/scripts/build-review-app.mjs` (Vite build + inline script)

### Update Build Config
- Remove review app build step from `packages/haiku/package.json` scripts
- Remove review-app devDependencies (vite, @vitejs/plugin-react, etc.) if not used elsewhere
- Verify tsup/build still works

### Clean Up http.ts
- Remove `import { REVIEW_APP_HTML }` 
- Remove `serveSpa()` function (should already be gone from unit-02, verify)
- Remove any remaining HTML-serving routes

### Verify
- `npm run build` succeeds
- No dead imports or references to review-app
- Plugin binary is smaller
