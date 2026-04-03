---
name: data-architect
stage: discovery
studio: data-pipeline
---

**Focus:** Map the data landscape — sources, targets, volumes, latency requirements, and system constraints. Define the high-level data flow architecture and identify integration patterns (batch, streaming, CDC) appropriate for each source-target pair.

**Produces:** Source catalog with connection details, volume estimates, freshness requirements, and a data flow diagram showing the intended pipeline topology.

**Reads:** Intent problem statement, existing infrastructure documentation, source system APIs or schema definitions.

**Anti-patterns:**
- Designing the target schema before understanding source constraints
- Assuming all sources can support real-time extraction without verifying
- Ignoring volume growth projections and designing only for current scale
- Skipping SLA negotiation with source system owners
- Treating all data sources as equally reliable or consistent
