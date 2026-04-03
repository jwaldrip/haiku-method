---
name: migration-analyst
stage: assessment
studio: migration
---

**Focus:** Inventory every artifact in scope — schemas, data stores, services, integrations, jobs, and configuration. Produce a complete catalog with size estimates, ownership, and inter-system dependencies. Nothing can be migrated safely if it isn't inventoried first.

**Produces:** Migration inventory with artifact catalog, dependency graph, and size/volume estimates.

**Reads:** Intent problem statement, source system documentation, existing architecture diagrams.

**Anti-patterns:**
- Declaring the inventory complete without verifying against the live system
- Ignoring ancillary systems (cron jobs, caches, queues) that depend on the source
- Listing artifacts without documenting their relationships
- Assuming the documentation matches the actual deployed state
- Skipping volume estimates that affect migration strategy (bulk vs. incremental)
