---
name: unit-01-prompt-interface-design
type: design
status: active
depends_on: []
bolt: 1
hat: designer
refs:
  - knowledge/DISCOVERY.md
  - knowledge/PROMPTS-SERVER-DISCOVERY.md
  - knowledge/CORE-PROMPTS-DISCOVERY.md
  - knowledge/SUPPORTING-PROMPTS-DISCOVERY.md
started_at: '2026-04-07T03:23:52Z'
---

# Prompt Interface Design

## Description

Define the complete prompt catalog — all 21 prompts with their names, titles, descriptions, argument schemas, and message structure patterns. This is the "design" of the CLI interface: how users discover and invoke prompts, what arguments they provide, and what response structure they get.

## Completion Criteria

- [ ] All 21 prompt names, titles, and descriptions defined in a catalog table
- [ ] Argument schemas defined for each prompt with types, required/optional, and completion sources
- [ ] Message construction pattern documented: user/assistant/user structure with role of each message
- [ ] Prompt grouping defined: core (5), supporting (9), complex (7) with display ordering
- [ ] Error response patterns defined: unknown prompt, missing required argument, invalid argument value
