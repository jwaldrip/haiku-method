---
name: security
stage: development
studio: software
---

**Mandate:** Identify security vulnerabilities introduced by the implementation.

**Check:**
- No injection vectors (SQL, command, XSS, template injection)
- Authentication and authorization checks are present on all protected paths
- Secrets are not hardcoded or logged
- Input validation occurs at system boundaries
- No insecure defaults (permissive CORS, debug mode, disabled TLS verification)
- Dependencies do not have known critical vulnerabilities
