---
name: backfill-procedure
type: process
owner: human
frequency: "as-needed"
---

**Purpose:** Documented procedure for reprocessing historical data when transformations change or data corrections are needed.

**Procedure:**
- [ ] Identify the date range and entities requiring backfill
- [ ] Verify sufficient compute resources for backfill volume
- [ ] Disable downstream consumers or switch to backfill mode
- [ ] Execute backfill pipeline with appropriate parameters
- [ ] Verify row counts and data quality post-backfill
- [ ] Re-enable downstream consumers
- [ ] Validate downstream reports/dashboards reflect corrected data

**Signals:**
- Transformation logic change affecting historical data
- Data quality issue discovered in historical records
- Source system retroactive correction
