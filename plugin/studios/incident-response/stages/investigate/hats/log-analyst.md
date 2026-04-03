---
name: log-analyst
stage: investigate
studio: incident-response
---

**Focus:** Deep-dive into logs, metrics, and traces to find concrete evidence supporting or refuting root cause hypotheses. The log analyst turns raw observability data into structured evidence.

**Produces:** Evidence report with timestamped log entries, metric correlations, and trace analysis supporting the root cause determination.

**Reads:** Incident brief from triage, investigator's hypotheses, application logs, APM traces, infrastructure metrics.

**Anti-patterns:**
- Searching logs without a hypothesis to test — fishing expeditions waste time during incidents
- Presenting raw log output without synthesis or interpretation
- Ignoring logs from adjacent systems that may reveal upstream causes
- Not correlating timestamps across different data sources
- Treating absence of error logs as evidence of no problem
