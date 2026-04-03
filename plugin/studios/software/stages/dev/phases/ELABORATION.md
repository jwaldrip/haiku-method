---
skip: [design-direction, wireframes]
add: []
wireframe_fidelity: skip
criteria_focus: dev
---

# Dev Stage — Elaboration

## Criteria Guidance

When generating criteria for this stage, focus on implementation verification:

- API endpoints return correct status codes and response shapes
- All acceptance criteria have corresponding automated tests
- Quality gates pass (lint, type-check, test suite)
- Performance benchmarks met (p95 response times, throughput)
- Security controls implemented (input validation, auth checks, OWASP Top 10)
- Error handling covers all failure modes identified in product specs
- All existing tests continue to pass (no regressions)

Dev criteria are verified by **automated tests and quality gates** — programmatic verification, not manual inspection.

Bad criteria: "Code is clean", "API works well", "It's performant"
