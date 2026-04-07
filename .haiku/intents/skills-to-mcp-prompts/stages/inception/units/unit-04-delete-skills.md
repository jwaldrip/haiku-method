---
name: unit-04-delete-skills
type: backend
status: pending
depends_on: [unit-02-core-prompts, unit-03-supporting-prompts]
bolt: 0
hat: ""
refs:
  - knowledge/DISCOVERY.md
---

# Delete Plugin Skills

## Description

Remove all plugin skill files now that MCP prompts replace them. Delete deprecated stubs entirely. Update plugin.json, hooks.json, and any references.

## Completion Criteria

- [ ] `plugin/skills/` directory deleted entirely
- [ ] Deprecated skills deleted: elaborate, execute, construct, resume, cleanup, compound
- [ ] Internal skills absorbed: fundamentals content embedded in prompts, completion-criteria in orchestrator
- [ ] plugin.json updated (no skill references)
- [ ] hooks.json updated if any hooks referenced skills
- [ ] CLAUDE.md skill references updated to MCP prompt references
- [ ] Binary size verified (should decrease — no skill file loading)
