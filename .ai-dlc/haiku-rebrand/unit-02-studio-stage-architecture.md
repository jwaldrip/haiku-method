---
status: pending
last_updated: ""
depends_on: [unit-01-mechanical-rebrand]
branch: ai-dlc/haiku-rebrand/02-studio-stage-architecture
discipline: backend
stage: ""
workflow: ""
ticket: ""
---

# unit-02-studio-stage-architecture

## Description
Implement the studio/stage architecture: studios as lifecycle templates, stages as self-contained lifecycle phases with inline hats, and the unified plan->build->review loop replacing the elaborate/execute split. This is the core architectural change that makes H·AI·K·U domain-agnostic.

## Discipline
backend - Plugin architecture, shell libraries, skill definitions.

## Domain Entities
Studio, Stage, STAGE.md, STUDIO.md, Hat (inline), Review Gate, Knowledge Pool.

## Technical Specification

### STUDIO.md Schema

```yaml
---
name: software                        # Studio identifier
description: Standard software development lifecycle
stages: [inception, design, product, development, operations, security]
persistence:
  type: git                           # Persistence adapter: git | filesystem
  delivery: pull-request              # How completed work is delivered
---

# Software Studio

Free-form documentation about when to use this studio, its philosophy,
team composition assumptions, etc. Read by the orchestrator for context
but not parsed structurally.
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Studio identifier, matches directory name |
| `description` | string | yes | One-line description |
| `stages` | string[] | yes | Ordered list of stage names — execution order |
| `persistence.type` | string | yes | Adapter type: `git`, `filesystem` |
| `persistence.delivery` | string | yes | Delivery mechanism: `pull-request`, `merge`, `copy`, `export` |

### STAGE.md Schema

```yaml
---
name: design
description: Visual and interaction design
hats: [designer, builder, reviewer]   # Ordered hat sequence — this IS the workflow
review: ask                           # Review gate: auto | ask | external
requires: []                          # Artifact names needed from prior stages
produces: [design-tokens, wireframes, component-specs, interaction-flows]
unit_types: [design, frontend]        # Disciplines of units this stage creates
---

# Design Stage

## designer

You are a designer exploring visual and interaction solutions...
(Full hat instructions for this stage — replaces plugin/hats/designer.md)

## builder

You are a builder implementing the design direction...
(Stage-specific builder focus — supplements the generic builder hat)

## reviewer

You are a reviewer validating design deliverables...
(Stage-specific reviewer focus)

## Criteria Guidance

When generating criteria for this stage, focus on:
- Screen layouts defined for all breakpoints
- All interactive states specified
- Touch targets meet 44px minimum
...

## Completion Signal

The design stage is complete when the design direction is clear enough
to inform subsequent product or dev stages without ambiguity.
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Stage identifier, matches directory name |
| `description` | string | yes | One-line description |
| `hats` | string[] | yes | Ordered hat sequence — defines the build workflow |
| `review` | string | yes | Review gate type: `auto`, `ask`, `external` |
| `requires` | string[] | no | Artifact names this stage needs from prior stages |
| `produces` | string[] | no | Artifact names this stage outputs |
| `unit_types` | string[] | no | Disciplines of units created in this stage |

**Body sections** (parsed by `## heading`):
- `## {hat-name}` — Per-hat instructions, one section per entry in `hats:` array
- `## Criteria Guidance` — Read by the criteria sub-skill during plan phase
- `## Completion Signal` — Read by the reviewer to determine stage completion

### Built-in Studio: Ideation (default)

```
plugin/studios/ideation/
├── STUDIO.md
└── stages/
    ├── research/
    │   └── STAGE.md
    ├── create/
    │   └── STAGE.md
    ├── review/
    │   └── STAGE.md
    └── deliver/
        └── STAGE.md
```

| Stage | Hats | Review | Description |
|-------|------|--------|-------------|
| research | `[analyst, hypothesizer]` | `auto` | Gather context, explore prior art, form hypotheses |
| create | `[planner, builder, reviewer]` | `ask` | Plan, build, and self-review the deliverable |
| review | `[red-team, blue-team, reviewer]` | `ask` | Adversarial review: challenge then defend |
| deliver | `[builder]` | `external` | Package and deliver the final artifact |

### Built-in Studio: Software

```
plugin/studios/software/
├── STUDIO.md
└── stages/
    ├── inception/
    │   └── STAGE.md
    ├── design/
    │   └── STAGE.md
    ├── product/
    │   └── STAGE.md
    ├── development/
    │   └── STAGE.md
    ├── operations/
    │   └── STAGE.md
    └── security/
        └── STAGE.md
```

| Stage | Hats | Review | Description |
|-------|------|--------|-------------|
| inception | `[analyst, planner]` | `auto` | Gather intent, discover codebase, initial decomposition |
| design | `[designer, builder, reviewer]` | `ask` | Visual/interaction design, wireframes, design tokens |
| product | `[analyst, planner, reviewer]` | `external` | Behavioral specs, acceptance criteria, go/no-go boundary |
| development | `[planner, builder, reviewer]` | `ask` | Implementation, testing, code review |
| operations | `[builder, reviewer]` | `auto` | Deployment, monitoring, runbooks |
| security | `[red-team, blue-team, reviewer]` | `ask` | Threat modeling, penetration testing, vulnerability review |

### Unified Stage Orchestrator

The elaborate/execute split is replaced by a unified stage loop. Three commands drive it:

#### `/haiku:stage {name}` — Discrete mode
Runs a single named stage through its full lifecycle:

```
Plan phase (what elaborate sub-skills become):
  ├── discover (codebase analysis, prior art)
  ├── criteria (generate completion criteria from STAGE.md ## Criteria Guidance)
  ├── decompose (break into units, constrained by STAGE.md unit_types)
  └── write artifacts (intent.md, unit-*.md files)

Build phase (what the execute loop becomes):
  ├── For each unit in dependency order:
  │   ├── Resolve hat sequence from STAGE.md hats: field
  │   ├── Run bolt cycles:
  │   │   ├── Planner hat   → reads STAGE.md + unit spec
  │   │   ├── Builder hat   → reads STAGE.md ## builder + unit spec
  │   │   ├── Quality gates → backpressure (tests, lint, typecheck)
  │   │   └── Reviewer hat  → reads STAGE.md ## reviewer + criteria
  │   │       ├── Criteria met → advance to next unit
  │   │       └── Issues found → another bolt cycle
  │   └── Unit complete

Adversarial review (after build, before gate):
  ├── Red-team hat challenges the work
  ├── Blue-team hat defends
  └── Final reviewer decides

Review gate (from STAGE.md review: field):
  ├── auto  → advance to next stage immediately
  ├── ask   → present to user, await approval/revision/go-back
  └── external → create PR / request team review, block until approved
```

#### `/haiku:run` — Continuous mode
Autopilot through all stages with review gates as the only pause points:

```
For each stage in STUDIO.md stages: array:
  ├── Load STAGE.md for structural metadata
  ├── Load prior stage artifacts (accumulated context)
  ├── Run plan phase
  ├── Run build phase
  ├── Run adversarial review
  ├── Hit review gate:
  │   ├── auto → continue to next stage
  │   ├── ask → pause, present to user, resume on approval
  │   └── external → block until team review completes
  └── Stage artifacts committed → become input for next stage
```

#### `/haiku:autopilot` — Fully autonomous mode
Same as continuous mode but defers almost all decisions to the agent. Review gates still fire but the agent makes the call. This is the existing autopilot behavior.

### What Sub-Skills Become

The elaborate sub-skills reorganize into the plan phase:

| Current Sub-Skill | Plan Phase Role | Changes |
|-------------------|-----------------|---------|
| `discover` | Codebase analysis | Reads STAGE.md `requires:` to focus discovery |
| `criteria` | Generate completion criteria | Reads STAGE.md `## Criteria Guidance` for focus |
| `decompose` | Break into units | Constrained by STAGE.md `unit_types` |
| `wireframes` | Design artifact generation | Only runs if STAGE.md `produces:` includes design artifacts |
| `workflow-select` | **REMOVED** | Hat sequence comes from STAGE.md `hats:` field |
| `design-direction` | Stage-specific | Runs in design stage, skipped in others |
| `single-pass` / `multi-pass` | **REMOVED** | Replaced by continuous vs discrete mode |
| `load-prior-artifacts` | Context accumulation | Reads completed stage artifacts from `.haiku/{slug}/stages/*/` |

### What the Execute Loop Becomes

The execute loop becomes the build phase within each stage:

| Current Execute Concept | New Location | Changes |
|-------------------------|-------------|---------|
| Hat resolution from `workflows.yml` | STAGE.md `hats:` field | No separate workflow file |
| Hat instructions from `plugin/hats/*.md` | STAGE.md `## {hat-name}` body sections | Inline per stage |
| `plugin/workflows.yml` | **REMOVED** | Stages define their own hat sequences |
| `advance` sub-skill | Still runs between units | Reads STAGE.md `## Completion Signal` |
| Bolt iteration loop | Unchanged | Same plan/build/review cycle per unit |
| Quality gates (backpressure) | Unchanged | Hook-driven, fires between hats |

### Artifact Directory Structure

```
.haiku/{intent-slug}/
├── intent.md                          # Intent definition (unchanged)
├── state.json                         # Top-level intent state
│                                      #   { studio, mode, active_stage, ... }
├── discovery.md                       # Discovery log (if used)
└── stages/
    ├── inception/
    │   ├── state.json                 # Per-stage state
    │   │                              #   { status, started_at, completed_at }
    │   └── units/
    │       └── unit-01-*.md
    ├── design/
    │   ├── state.json
    │   └── units/
    │       ├── unit-01-*.md
    │       └── unit-02-*.md
    ├── product/
    │   ├── state.json
    │   └── units/
    │       └── unit-01-*.md
    └── development/
        ├── state.json
        └── units/
            ├── unit-01-*.md
            ├── unit-02-*.md
            └── unit-03-*.md
```

### State Tracking

**Top-level intent state** (`.haiku/{slug}/state.json`):
```json
{
  "studio": "software",
  "mode": "continuous",
  "active_stage": "design",
  "stages_completed": ["inception"],
  "created_at": "2026-04-02T...",
  "updated_at": "2026-04-02T..."
}
```

**Per-stage state** (`.haiku/{slug}/stages/{stage}/state.json`):
```json
{
  "status": "in_progress",
  "phase": "build",
  "units_total": 3,
  "units_completed": 1,
  "started_at": "2026-04-02T...",
  "completed_at": null
}
```

### Intent Frontmatter Updates

```yaml
---
studio: software                  # Which studio (always set, default: "ideation")
mode: continuous                  # continuous | discrete
active_stage: design              # Current stage (empty if complete)
stages_completed: [inception]     # Stages that have finished
---
```

### Unit Frontmatter Updates

```yaml
---
stage: design                    # Which stage created this unit
status: pending
# ... rest unchanged
---
```

### Files/Directories to Delete

| Path | Reason |
|------|--------|
| `plugin/hats/acceptance-test-writer.md` | Hat instructions move into STAGE.md body sections |
| `plugin/hats/analyst.md` | Same |
| `plugin/hats/blue-team.md` | Same |
| `plugin/hats/builder-reference.md` | Same |
| `plugin/hats/builder.md` | Same |
| `plugin/hats/designer.md` | Same |
| `plugin/hats/experimenter.md` | Same |
| `plugin/hats/hypothesizer.md` | Same |
| `plugin/hats/implementer.md` | Same |
| `plugin/hats/observer.md` | Same |
| `plugin/hats/planner.md` | Same |
| `plugin/hats/red-team.md` | Same |
| `plugin/hats/refactorer.md` | Same |
| `plugin/hats/reviewer-reference.md` | Same |
| `plugin/hats/reviewer.md` | Same |
| `plugin/hats/test-writer.md` | Same |
| `plugin/workflows.yml` | Stages define their own hat sequences |
| `plugin/stages/` (if it exists at top level) | Stages live inside studios now |

### New Files to Create

| Path | Purpose |
|------|---------|
| `plugin/studios/ideation/STUDIO.md` | Default studio definition |
| `plugin/studios/ideation/stages/research/STAGE.md` | Research stage |
| `plugin/studios/ideation/stages/create/STAGE.md` | Create stage |
| `plugin/studios/ideation/stages/review/STAGE.md` | Review stage |
| `plugin/studios/ideation/stages/deliver/STAGE.md` | Deliver stage |
| `plugin/studios/software/STUDIO.md` | Software studio definition |
| `plugin/studios/software/stages/inception/STAGE.md` | Inception stage |
| `plugin/studios/software/stages/design/STAGE.md` | Design stage |
| `plugin/studios/software/stages/product/STAGE.md` | Product stage |
| `plugin/studios/software/stages/development/STAGE.md` | Development stage |
| `plugin/studios/software/stages/operations/STAGE.md` | Operations stage |
| `plugin/studios/software/stages/security/STAGE.md` | Security stage |
| `plugin/lib/studio.sh` | Studio resolution, validation, stage loading |
| `plugin/skills/stage/SKILL.md` | `/haiku:stage` — discrete mode orchestrator |
| `plugin/skills/run/SKILL.md` | `/haiku:run` — continuous mode orchestrator |

### Library Updates

**`plugin/lib/studio.sh`** (new or updated):
- `resolve_studio(name)` — find STUDIO.md (project override -> built-in)
- `resolve_studio_stages(studio_name)` — return ordered stage list
- `validate_studio(name)` — verify all declared stages have STAGE.md files

**`plugin/lib/stage.sh`** (updated):
- `resolve_stage_definition(stage_name, studio_name)` — find STAGE.md
- `load_stage_hats(stage_name, studio_name)` — parse `hats:` from frontmatter
- `load_stage_hat_instructions(stage_name, hat_name, studio_name)` — extract `## {hat-name}` body section
- `load_stage_review_mode(stage_name, studio_name)` — parse `review:` field

**`plugin/lib/hat.sh`** (updated):
- Remove references to `plugin/hats/*.md` files
- Load hat instructions from active stage's STAGE.md body sections instead

**Settings schema** (`plugin/schemas/settings.schema.json`):
- Add `studio` field (string, default: "ideation")
- Remove any `default_stages` or `default_passes` fields

### Backwards Compatibility

**Single-stage mode (collapsed FSM) must still work.** When `mode: continuous` and studio has a single effective stage, or when invoked via `/haiku:quick`, the system collapses:
- `hats:` = union of all stages' hats (deduplicated)
- Criteria guidance = concatenation from all stages
- No stage directories created — units go directly in `.haiku/{slug}/units/`
- No inter-stage artifact flow

## Success Criteria
- [ ] Default ideation studio exists with 4 stages, each with STAGE.md defining hats, review mode, requires/produces
- [ ] Software studio exists with 6 stages, each with STAGE.md including inline hat instructions
- [ ] `plugin/hats/` directory is deleted (all 16 files)
- [ ] `plugin/workflows.yml` is deleted
- [ ] `/haiku:stage {name}` runs a single stage through plan -> build -> adversarial review -> gate
- [ ] `/haiku:run` drives continuous mode through all stages with review gates as pause points
- [ ] `/haiku:autopilot` still works as fully autonomous mode
- [ ] Each STAGE.md defines hats in frontmatter and per-hat instructions in body `## {hat-name}` sections
- [ ] Review gates work correctly: `auto` advances, `ask` pauses for user, `external` creates PR
- [ ] Units are stored under `.haiku/{slug}/stages/{stage}/units/`
- [ ] Top-level state tracks at `.haiku/{slug}/state.json` (studio, mode, active_stage)
- [ ] Per-stage state tracks at `.haiku/{slug}/stages/{stage}/state.json` (status, phase, units_total/completed)
- [ ] Plan phase correctly reads STAGE.md `## Criteria Guidance` and `unit_types` for decomposition
- [ ] Build phase correctly reads STAGE.md `## {hat-name}` sections for hat instructions
- [ ] Adversarial review runs after build phase, before review gate
- [ ] All existing tests pass

## Risks
- **Backwards compatibility**: Existing `.ai-dlc/` intents from before the rebrand will not be recognized. Mitigation: unit-01 renames all paths first; migration script or backwards-compat shim can read old format if needed.
- **Hat instruction quality**: Moving from dedicated hat files (some are 300+ lines) into STAGE.md body sections could lose nuance if sections are too terse. Mitigation: each hat section should preserve the full instruction set from the original hat file, adapted for stage context.
- **Elaborate sub-skills**: The discover, criteria, decompose sub-skills need to work within the new stage context. Mitigation: they become plan phase internals with minimal API change — they read from STAGE.md frontmatter instead of workflows.yml.
- **Workflow guard hook**: `plugin/hooks/workflow-guard.sh` currently validates against `workflows.yml`. Mitigation: update to validate against STAGE.md `hats:` field instead, or remove if redundant.

## Boundaries
This unit does NOT implement persistence abstraction (unit-03). Git operations stay hardcoded for now. This unit does NOT update the paper or website docs (unit-04).
