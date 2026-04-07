---
name: data-sync-monitor
type: reactive
owner: agent
trigger: "migration active"
runtime: node
---

**Purpose:** During active migration, continuously verify data sync between source and target.

**Procedure:**
- Compare row counts between source and target for migrated entities
- Run checksum verification on a sample of records
- Verify no data loss from in-flight writes during sync windows
- Alert on sync lag exceeding threshold

**Signals:**
- Migration is in progress
- Sync lag exceeds configured threshold
- Row count discrepancy detected
