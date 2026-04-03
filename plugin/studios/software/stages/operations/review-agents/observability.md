---
name: observability
stage: operations
studio: software
---

**Mandate:** Verify the system is observable enough to diagnose issues in production.

**Check:**
- Key operations emit structured logs with correlation IDs
- Metrics cover the four golden signals (latency, traffic, errors, saturation)
- Alerts have clear runbooks or at minimum actionable descriptions
- Dashboards exist for the critical user journeys
- No sensitive data in logs or metrics (PII, credentials, tokens)
