---
name: unit-04-delete-skills
type: backend
status: completed
depends_on:
  - unit-02-core-prompts
  - unit-03-supporting-prompts
bolt: 1
hat: decomposer
refs:
  - knowledge/DISCOVERY.md
  - knowledge/PROMPTS-SERVER-DISCOVERY.md
  - knowledge/DELETE-SKILLS-DISCOVERY.md
started_at: '2026-04-07T02:50:41Z'
completed_at: '2026-04-07T02:52:03Z'
---

# Delete Plugin Skills

## Description

Remove all plugin skill files now that MCP prompts replace them. Delete deprecated stubs entirely. Update plugin.json, hooks.json, and any references.

## Completion Criteria

- [x] `plugin/skills/` directory deleted entirely
- [x] Deprecated skills deleted: elaborate, execute, construct, resume, cleanup, compound
- [x] Internal skills absorbed: fundamentals content embedded in prompts, completion-criteria in orchestrator
- [x] plugin.json updated (no skill references)
- [x] hooks.json updated if any hooks referenced skills
- [x] CLAUDE.md skill references updated to MCP prompt references
- [x] Binary size verified (should decrease — no skill file loading)
