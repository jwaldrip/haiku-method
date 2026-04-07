---
user-invocable: true
argument-hint: ""
---

# H·AI·K·U Guide

H·AI·K·U = Human + AI Knowledge Unification. A lifecycle framework for structured AI-assisted work.

## How It Works

All commands are MCP prompts on the `haiku` server. Invoke them as `/haiku:new`, `/haiku:run`, etc. Do NOT use the Skill tool for haiku commands — they are MCP prompts, not skills.

The orchestrator tool `haiku_run_next { intent }` drives everything. It returns an action + `stage_metadata`. Follow the action, then call it again. Repeat.

## Hierarchy

**Studio** → **Stage** → **Unit** → **Bolt**

- **Studio** — lifecycle template (e.g., software, ideation). Defines stages.
- **Stage** — phase within a studio (e.g., inception, design, development). Has hats, review gates, unit types.
- **Unit** — discrete piece of work within a stage. Has completion criteria and a dependency DAG.
- **Bolt** — iteration cycle within a unit. Increment when criteria aren't met.
- **Hat** — behavioral role scoped to a stage (e.g., architect, builder, reviewer).

## Stage Scope (Critical)

Every `haiku_run_next` response includes `stage_metadata` — the stage's description, allowed unit_types, and STAGE.md body. ALL work MUST stay within the stage's scope. Do not produce outputs belonging to other stages.

## Key MCP Tools

| Tool | Purpose |
|------|---------|
| `haiku_run_next` | Get next action for an intent |
| `haiku_intent_list` | List all intents |
| `haiku_intent_set` | Set intent field |
| `haiku_stage_start` | Start a stage |
| `haiku_stage_set` | Set stage field (phase, etc.) |
| `haiku_stage_complete` | Complete a stage |
| `haiku_unit_start` | Start a unit |
| `haiku_unit_advance_hat` | Move to next hat |
| `haiku_unit_complete` | Complete a unit |
| `haiku_unit_increment_bolt` | New iteration cycle |
| `haiku_gate_approve` | Approve an ask gate |
| `open_review` | Open visual review page (blocks until user responds) |
| `ask_user_visual_question` | Open question form (blocks until user responds) |
| `haiku_studio_list` | List available studios |

## Commands (MCP Prompts)

**Core:** new, run, refine, review, reflect
**Supporting:** autopilot, composite, setup, migrate, scaffold, operate, triggers, dashboard, backlog
**Niche:** adopt, quick, seed, ideate, pressure-testing, capacity, release-notes
