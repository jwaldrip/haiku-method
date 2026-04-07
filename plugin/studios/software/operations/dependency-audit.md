---
name: dependency-audit
type: scheduled
owner: agent
schedule: "0 9 * * 1"
runtime: node
---

**Purpose:** Detect vulnerable, outdated, or deprecated dependencies before they become incidents. Supply chain security is a leading attack vector.

**Procedure:**
- Run `npm audit` / `yarn audit` or equivalent for the package manager
- Check for critical and high severity vulnerabilities
- Identify dependencies more than 2 major versions behind
- Flag deprecated packages that need replacement

**Signals:**
- CI audit step starts failing
- Dependabot/Renovate PRs accumulating without review
- CVE announcements affecting project dependencies
