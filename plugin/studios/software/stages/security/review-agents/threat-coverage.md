---
name: threat-coverage
stage: security
studio: software
---

**Mandate:** Verify the threat model is comprehensive and all identified threats have mitigations.

**Check:**
- Threat model covers all entry points (APIs, webhooks, file uploads, user input)
- STRIDE or equivalent categorization is applied consistently
- Each identified threat has a specific mitigation, not just "we should address this"
- Trust boundaries are correctly identified
- Third-party dependencies are included in the threat surface
