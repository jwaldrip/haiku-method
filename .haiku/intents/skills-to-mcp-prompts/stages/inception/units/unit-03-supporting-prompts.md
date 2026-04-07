---
name: unit-03-supporting-prompts
type: backend
status: pending
depends_on: [unit-01-prompts-server]
bolt: 0
hat: ""
refs:
  - knowledge/DISCOVERY.md
---

# Supporting + Reporting + Niche Prompts

## Description

Implement the remaining 16 prompts: composite, autopilot, setup, migrate, scaffold, operate, triggers, dashboard, backlog, capacity, release-notes, adopt, quick, seed, ideate, pressure-testing.

These are simpler than the core prompts — most just read state and return instructions. Some (like dashboard, backlog) are read-only.

## Completion Criteria

- [ ] All 16 supporting prompts implemented and registered
- [ ] Each returns well-formed PromptMessage[] with context
- [ ] `haiku:autopilot` sets mode=continuous and chains to run
- [ ] `haiku:composite` validates 2+ studios selected
- [ ] `haiku:dashboard` returns current intent status as formatted context
- [ ] `haiku:migrate` runs the migration binary
- [ ] All prompts surface as slash commands in Claude Code
