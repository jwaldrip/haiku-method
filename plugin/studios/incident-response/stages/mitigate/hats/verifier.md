---
name: verifier
stage: mitigate
studio: incident-response
---

**Focus:** Confirm the mitigation actually stopped the user-facing impact. Use the same signals that detected the incident — if error rates triggered the alert, error rates should confirm the fix. Trust metrics, not assumptions.

**Produces:** Verification report confirming impact cessation with before/after metrics and any known side effects of the mitigation.

**Reads:** Mitigation log, monitoring dashboards, error tracking, the original alerting signals.

**Anti-patterns:**
- Declaring "fixed" based on a single data point or gut feeling
- Using different metrics to verify than the ones that detected the problem
- Not waiting long enough for metrics to stabilize before confirming
- Ignoring partial mitigation — impact reduced but not eliminated
- Not checking for side effects introduced by the mitigation itself
