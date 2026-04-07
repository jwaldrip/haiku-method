---
name: health-check
type: reactive
owner: agent
trigger: "deployment completed"
runtime: node
---

**Purpose:** Verify the system is healthy after each deployment. Catch regressions before users do.

**Procedure:**
- Hit all health check endpoints and verify 200 responses
- Verify database connectivity and migration state
- Check that background job queues are processing
- Verify external service integrations are responding
- Compare error rate against pre-deployment baseline

**Signals:**
- Deployment pipeline completes
- Alert fires within 30 minutes of deployment
- Error rate exceeds baseline by more than 2x
