---
name: mitigation-effectiveness
stage: security
studio: software
---

**Mandate:** Challenge whether proposed mitigations actually address the threats they claim to.

**Check:**
- Mitigations address the root cause, not just the symptom
- Defense-in-depth: critical threats have multiple layers of mitigation
- Mitigations do not introduce new attack surface
- Cryptographic choices are current (no MD5, SHA-1 for security purposes, adequate key lengths)
- Rate limiting and abuse prevention cover automated attack scenarios, not just manual misuse
