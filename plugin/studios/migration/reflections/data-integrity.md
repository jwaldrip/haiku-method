---
name: data-integrity
studio: migration
---

**Analyze:** Data reconciliation results, record loss/corruption rates, validation failures.

**Look for:**
- Entity types with the most reconciliation discrepancies
- Data transformations that introduced errors
- Edge cases that the mapping missed (encoding, timezone, null handling)
- Whether validation caught issues before or after cutover

**Produce:**
- Data integrity scorecard by entity type
- Transformation accuracy assessment
- Recommendations for mapping and validation improvements in future migrations
