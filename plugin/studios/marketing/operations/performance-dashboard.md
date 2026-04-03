---
name: performance-dashboard
type: scheduled
owner: agent
schedule: "0 8 * * 1"
runtime: node
---

**Purpose:** Generate weekly campaign performance snapshots. Trends matter more than individual data points.

**Procedure:**
- Pull KPIs defined in the strategy stage
- Compare current period to previous period and baseline
- Identify statistically significant changes (not just noise)
- Flag metrics trending below target thresholds

**Signals:**
- Weekly reporting cadence
- Campaign launch or major asset change
- Spend threshold exceeded
