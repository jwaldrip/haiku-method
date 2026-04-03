---
name: backup-verification
type: scheduled
owner: agent
schedule: "0 3 1 * *"
runtime: node
---

**Purpose:** Verify that backups are actually restorable. An untested backup is not a backup.

**Procedure:**
- List most recent backups for all data stores
- Restore the latest backup to a test environment
- Run integrity checks against the restored data
- Verify row counts match production within tolerance
- Clean up test environment

**Signals:**
- Monthly schedule
- After any database schema migration
- After any storage infrastructure change
