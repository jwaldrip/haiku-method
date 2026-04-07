---
name: link-checker
type: scheduled
owner: agent
schedule: "0 9 * * 1"
runtime: node
---

**Purpose:** Detect broken links before users do. Link rot erodes trust in documentation.

**Procedure:**
- Crawl all published documentation pages
- Verify internal links resolve to existing pages
- Verify external links return 200 responses
- Report broken links with the page they appear on

**Signals:**
- Weekly check
- After any documentation restructuring
- After external dependencies change URLs
