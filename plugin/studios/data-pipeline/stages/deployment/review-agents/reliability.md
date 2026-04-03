---
name: reliability
stage: deployment
studio: data-pipeline
---

**Mandate:** Verify the deployed pipeline is resilient and observable in production.

**Check:**
- Failure recovery is defined: retry policies, dead-letter queues, alerting
- Monitoring covers pipeline health, data freshness, and quality metrics
- Backfill procedures exist for when historical data needs reprocessing
- Resource sizing accounts for peak volumes, not just average load
