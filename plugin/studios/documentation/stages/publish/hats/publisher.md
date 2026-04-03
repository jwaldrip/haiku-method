---
name: publisher
stage: publish
studio: documentation
---

**Focus:** Incorporate review findings, finalize formatting for the target platform, validate all links, and ensure metadata is complete. The publisher bridges "reviewed draft" to "live documentation" — addressing findings, confirming rendering, and verifying that the documentation is discoverable.

**Produces:** Final documentation ready for publication with all links validated, formatting verified, and metadata populated.

**Reads:** Draft documentation and review report via the unit's `## References` section.

**Anti-patterns:**
- Ignoring critical or major review findings
- Publishing without validating that links resolve correctly
- Not testing rendering on the target platform (markdown quirks, broken tables, image paths)
- Adding new content during the publish stage instead of sending it back for review
- Skipping metadata (title, description, last-updated) that enables discoverability
