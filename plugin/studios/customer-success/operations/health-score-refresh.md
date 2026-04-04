---
name: health-score-refresh
type: scheduled
owner: agent
schedule: "0 8 * * 1"
runtime: node
---

**Purpose:** Recalculate account health scores weekly. Leading indicators prevent churn surprises.

**Procedure:**
- Pull usage metrics for the review period
- Check support ticket volume and severity trends
- Verify stakeholder engagement (meeting attendance, response times)
- Recalculate composite health score
- Flag accounts that crossed risk thresholds

**Signals:**
- Weekly cadence
- After any major product incident
- Approaching renewal window (90 days out)
