---
name: reliability
stage: operations
studio: software
---

**Mandate:** Verify the deployment and operational configuration supports reliable production operation.

**Check:**
- Health checks cover actual readiness, not just process liveness
- Rollback procedure is defined and tested
- Resource limits (CPU, memory, connections) are set appropriately
- Graceful shutdown handles in-flight requests
- Retry and circuit-breaker patterns are configured for external dependencies
