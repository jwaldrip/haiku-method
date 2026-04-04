---
name: performance
stage: development
studio: software
---

**Mandate:** Identify performance regressions or inefficiencies in the implementation.

**Check:**
- No N+1 query patterns or unbounded data fetches
- Database queries use appropriate indexes (check against schema)
- Large collections are paginated, not loaded entirely into memory
- No blocking operations on hot paths
- Caching is used where specified, with correct invalidation
- Bundle size impact is reasonable for frontend changes
