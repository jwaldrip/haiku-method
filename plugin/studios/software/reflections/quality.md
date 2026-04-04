---
name: quality
studio: software
---

**Analyze:** Review agent findings, quality gate pass/fail rates, test coverage changes, and reviewer hat rejection patterns.

**Look for:**
- Review agent categories with the most HIGH findings (security, correctness, etc.)
- Quality gates that always pass (potentially useless) or always fail (potentially misconfigured)
- Test coverage trends across units
- Reviewer rejections that led to productive fixes vs circular rework

**Produce:**
- Quality gate effectiveness assessment
- Review agent value ranking (which agents caught real issues vs noise)
- Recommendations for gate/agent configuration changes
