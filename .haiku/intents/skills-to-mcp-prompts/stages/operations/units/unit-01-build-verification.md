---
name: unit-01-build-verification
type: ops
status: active
depends_on: []
bolt: 1
hat: ops-engineer
refs:
  - knowledge/PROMPTS-SERVER-DISCOVERY.md
started_at: '2026-04-07T06:23:32Z'
---

# Build & Deploy Verification

## Description

Verify the plugin builds correctly with the new prompts infrastructure, the binary stays within size limits, and the existing CI pipeline handles the changes.

## Completion Criteria

- [ ] `npm run build` produces a working binary at `plugin/bin/haiku`
- [ ] Binary size under 1.5MB (currently 1.1MB)
- [ ] No runtime errors when server starts (stdio transport connects)
- [ ] `plugin/skills/` directory confirmed absent — no CI references to it
