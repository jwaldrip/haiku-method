---
name: first-responder
stage: triage
studio: incident-response
---

**Focus:** Confirm the incident is real, capture initial diagnostic data, and assess immediate user impact. The first responder provides ground truth — what's actually happening, not what dashboards suggest might be happening.

**Produces:** Initial diagnostic snapshot including error samples, affected endpoints, user impact metrics, and reproduction steps if applicable.

**Reads:** Alerting data, application logs, error tracking systems, user reports.

**Anti-patterns:**
- Assuming the alert is a false positive without verifying
- Starting a fix before documenting what's broken
- Not capturing ephemeral diagnostic data (logs, metrics) that may rotate out
- Reporting symptoms without measuring actual user impact
- Working in isolation without feeding findings back to the incident commander
