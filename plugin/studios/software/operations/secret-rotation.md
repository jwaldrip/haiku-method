---
name: secret-rotation
type: scheduled
owner: human
frequency: "quarterly"
---

**Purpose:** Rotate API keys, tokens, and credentials on a regular cadence to limit blast radius of any undetected compromise.

**Procedure:**
- [ ] Inventory all secrets in use (env vars, vault entries, CI secrets)
- [ ] Generate new credentials for each service
- [ ] Update secrets in all environments (dev, staging, production)
- [ ] Verify services function with new credentials
- [ ] Revoke old credentials
- [ ] Update documentation if secret format changed

**Signals:**
- Quarterly calendar reminder
- After any team member departure
- After any suspected credential exposure
