---
name: unit-02-core-prompts
type: backend
status: pending
depends_on: [unit-01-prompts-server]
bolt: 0
hat: ""
refs:
  - knowledge/DISCOVERY.md
  - knowledge/PROMPTS-SERVER-DISCOVERY.md
---

# Core Workflow Prompts

## Description

Implement the 5 core workflow prompts: `haiku:new`, `haiku:run`, `haiku:refine`, `haiku:review`, `haiku:reflect`. Each reads current state + stage metadata and returns a multi-message conversation.

`haiku:run` is the most complex — it calls `haiku_run_next` internally, reads the action, loads hat definitions, stage config, elaboration mode, and constructs the appropriate prompt. For `gate_ask`, it calls `open_review` as a side effect before returning.

## Completion Criteria

- [ ] `haiku:new` prompt: gathers description, detects studio, sets mode, creates intent, presents direction for review via ask_user_visual_question
- [ ] `haiku:run` prompt: calls orchestrator, reads action, constructs prompt with stage/hat/elaboration context inlined
- [ ] `haiku:run` enforces visual review: calls open_review for gate_ask before returning prompt
- [ ] `haiku:run` elaboration mode: collaborative prompts include multi-turn conversation instructions, autonomous prompts are concise
- [ ] `haiku:refine` prompt: loads upstream stage context, constructs side-trip prompt
- [ ] `haiku:review` prompt: loads diff + review agents, constructs review prompt
- [ ] `haiku:reflect` prompt: loads completed intent, constructs analysis prompt
