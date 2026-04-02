---
status: pending
last_updated: ""
depends_on: [unit-04-studio-infrastructure]
branch: ai-dlc/haiku-rebrand/05-stage-definitions
discipline: backend
stage: ""
workflow: ""
ticket: ""
---

# unit-05-stage-definitions

## Description

Create the full stage definitions for both the ideation studio (4 stages) and the software studio (6 stages). Each stage gets a STAGE.md file with frontmatter defining hats, review mode, inputs list, and a body with per-hat guidance, criteria examples, and completion signals. Each stage also gets an `outputs/` directory with self-describing frontmatter docs that declare scope, location, format, and guidance for each output.

## Discipline

backend - Stage definition files with structured frontmatter and instructional body content.

## Domain Entities

### Ideation Studio Stages

- `plugin/studios/ideation/stages/research/STAGE.md`
- `plugin/studios/ideation/stages/research/outputs/RESEARCH-BRIEF.md` (scope: intent)
- `plugin/studios/ideation/stages/create/STAGE.md`
- `plugin/studios/ideation/stages/create/outputs/DRAFT-DELIVERABLE.md` (scope: intent)
- `plugin/studios/ideation/stages/review/STAGE.md`
- `plugin/studios/ideation/stages/review/outputs/REVIEW-REPORT.md` (scope: stage)
- `plugin/studios/ideation/stages/deliver/STAGE.md`
- `plugin/studios/ideation/stages/deliver/outputs/FINAL-DELIVERABLE.md` (scope: intent)

### Software Studio Stages

- `plugin/studios/software/stages/inception/STAGE.md`
- `plugin/studios/software/stages/inception/outputs/DISCOVERY.md` (scope: intent)
- `plugin/studios/software/stages/design/STAGE.md`
- `plugin/studios/software/stages/design/outputs/DESIGN-BRIEF.md` (scope: stage)
- `plugin/studios/software/stages/design/outputs/DESIGN-TOKENS.md` (scope: intent)
- `plugin/studios/software/stages/product/STAGE.md`
- `plugin/studios/software/stages/product/outputs/BEHAVIORAL-SPEC.md` (scope: intent)
- `plugin/studios/software/stages/product/outputs/DATA-CONTRACTS.md` (scope: intent)
- `plugin/studios/software/stages/development/STAGE.md`
- `plugin/studios/software/stages/development/outputs/CODE.md` (scope: repo)
- `plugin/studios/software/stages/development/outputs/ARCHITECTURE.md` (scope: project)
- `plugin/studios/software/stages/operations/STAGE.md`
- `plugin/studios/software/stages/operations/outputs/RUNBOOK.md` (scope: intent)
- `plugin/studios/software/stages/operations/outputs/DEPLOYMENT-CONFIG.md` (scope: repo)
- `plugin/studios/software/stages/security/STAGE.md`
- `plugin/studios/software/stages/security/outputs/THREAT-MODEL.md` (scope: intent)
- `plugin/studios/software/stages/security/outputs/VULN-REPORT.md` (scope: intent)

## Technical Specification

### STAGE.md Schema

Each stage follows this structure:

```yaml
---
name: <stage-name>
description: <one-line description>
hats: [<ordered list of hat roles>]
review: auto | ask | external
unit_types: [<disciplines of units this stage creates>]
inputs: [<output names from prior stages>]
---

# <Stage Name>

<Free-form purpose and philosophy>

## <hat-name>

<Guidance for this hat when active in this stage>

## Criteria Guidance

<How to write good criteria for this stage>

## Completion Signal

<When this stage is done>
```

No `requires:` or `produces:` fields. Inputs are a simple frontmatter list. Outputs are defined in the `outputs/` directory.

### Output Docs

Each stage has an `outputs/` directory with self-describing frontmatter docs. These guide the agent on what to produce and declare where the output persists:

```
plugin/studios/software/stages/inception/
├── STAGE.md
└── outputs/
    └── DISCOVERY.md       # scope: intent, format: text
```

Each output doc follows this format:

```yaml
---
name: discovery
location: .haiku/intents/{name}/knowledge/DISCOVERY.md
scope: intent
format: text
required: true
---

# Discovery Output Guide

When exploring the domain, document:
- Every entity and its fields
- Every API endpoint and its behavior
...
```

Output doc fields:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Output identifier (referenced by other stages' `inputs:` lists) |
| `location` | string | Path template where the output is persisted |
| `scope` | string | `project`, `intent`, `stage`, or `repo` |
| `format` | string | `text`, `code`, or `design` |
| `required` | boolean | Must be produced before stage completes |

Scopes:

| Scope | Persisted To | Lifespan |
|-------|-------------|----------|
| `project` | `.haiku/knowledge/{name}.md` | Across intents |
| `intent` | `.haiku/intents/{name}/knowledge/{name}.md` | This intent |
| `stage` | `.haiku/intents/{name}/stages/{stage}/{name}` | This stage's units |
| `repo` | Project source tree | Permanent |

### Ideation Studio Stages

#### research

```yaml
---
name: research
description: Gather context, explore prior art, and understand the problem space
hats: [researcher, analyst]
review: auto
unit_types: [research]
inputs: []
---
```

- **researcher** hat: explore sources, gather data, synthesize findings
- **analyst** hat: evaluate findings, identify patterns, surface insights
- Review `auto` — research naturally flows into creation
- Outputs: `outputs/RESEARCH-BRIEF.md` (scope: intent)

#### create

```yaml
---
name: create
description: Generate the primary deliverable using research insights
hats: [creator, editor]
review: ask
unit_types: [content]
inputs: [research-brief]
---
```

- **creator** hat: produce the primary output (document, design, plan, etc.)
- **editor** hat: refine, restructure, improve clarity and quality
- Review `ask` — the user decides when the draft is ready for formal review
- Outputs: `outputs/DRAFT-DELIVERABLE.md` (scope: intent)

#### review

```yaml
---
name: review
description: Adversarial quality review of the deliverable
hats: [critic, fact-checker]
review: ask
unit_types: [review]
inputs: [draft-deliverable]
---
```

- **critic** hat: identify weaknesses, gaps, inconsistencies
- **fact-checker** hat: verify claims, check sources, validate logic
- Review `ask` — review findings are presented for the user to act on
- Outputs: `outputs/REVIEW-REPORT.md` (scope: stage)

#### deliver

```yaml
---
name: deliver
description: Finalize and package the deliverable for its audience
hats: [publisher]
review: auto
unit_types: [delivery]
inputs: [draft-deliverable, review-report]
---
```

- **publisher** hat: format, package, and deliver
- Review `auto` — once review is addressed, delivery completes
- Outputs: `outputs/FINAL-DELIVERABLE.md` (scope: intent)

### Software Studio Stages

#### inception

```yaml
---
name: inception
description: Understand the problem, define success, and decompose into units
hats: [architect, decomposer]
review: auto
unit_types: [research, backend, frontend]
inputs: []
---
```

- **architect** hat: understand the problem space, define scope, identify technical constraints
- **decomposer** hat: break the intent into units with dependencies and criteria
- Review `auto` — inception flows directly into design
- This stage maps to the existing elaboration sub-skills: gather, discover, decompose, criteria, DAG
- Outputs: `outputs/DISCOVERY.md` (scope: intent)

#### design

```yaml
---
name: design
description: Visual and interaction design for user-facing surfaces
hats: [designer, design-reviewer]
review: ask
unit_types: [design, frontend]
inputs: [discovery]
---
```

- **designer** hat: explore wireframes, define tokens, specify component structure and states, map interaction flows
- **design-reviewer** hat: check consistency with design system, verify all states covered (default, hover, focus, active, disabled, error), confirm responsive behavior
- Review `ask` — design direction needs human approval before product proceeds
- Criteria guidance: screen layouts for all breakpoints, interactive states specified, touch targets >= 44px, design tokens only (no raw hex)
- Design criteria are verified by visual approval, not automated tests
- Outputs: `outputs/DESIGN-BRIEF.md` (scope: stage), `outputs/DESIGN-TOKENS.md` (scope: intent)

#### product

```yaml
---
name: product
description: Define behavioral specifications and acceptance criteria
hats: [product-owner, specification-writer]
review: external
unit_types: [product, backend, frontend]
inputs: [discovery, design-tokens]
---
```

- **product-owner** hat: define user stories, prioritize, make scope decisions
- **specification-writer** hat: write behavioral specs, define data contracts, specify API contracts
- Review `external` — this is the go/no-go decision boundary where the team decides whether to actually build the thing. In practice: creates a PR or review request for team approval.
- Criteria guidance: behavioral specs per user flow, data contracts defined, API contracts specified, edge cases documented
- Outputs: `outputs/BEHAVIORAL-SPEC.md` (scope: intent), `outputs/DATA-CONTRACTS.md` (scope: intent)

#### development

```yaml
---
name: development
description: Implement the specification through code
hats: [planner, builder, reviewer]
review: ask
unit_types: [backend, frontend, fullstack]
inputs: [behavioral-spec, data-contracts]
---
```

- **planner** hat: read unit spec + prior stage outputs, plan implementation approach
- **builder** hat: write code, implement features, fix issues. Guided by behavioral spec from product stage.
- **reviewer** hat: code review, check criteria compliance, verify test coverage. Hard-gated on criteria.
- Review `ask` — pause for user review before operations
- This stage maps to the existing execute skill's bolt loop: plan -> build -> quality gates -> review
- Outputs: `outputs/CODE.md` (scope: repo), `outputs/ARCHITECTURE.md` (scope: project)

#### operations

```yaml
---
name: operations
description: Deployment, monitoring, and operational readiness
hats: [ops-engineer, sre]
review: auto
unit_types: [ops, backend]
inputs: [implementation, architecture]
---
```

- **ops-engineer** hat: configure deployment, set up CI/CD, define infrastructure
- **sre** hat: define SLOs, set up monitoring, write runbooks
- Review `auto` — operational setup advances automatically when complete
- Criteria guidance: deployment pipeline defined, monitoring covers key metrics, runbook exists for common failure modes
- Outputs: `outputs/RUNBOOK.md` (scope: intent), `outputs/DEPLOYMENT-CONFIG.md` (scope: repo)

#### security

```yaml
---
name: security
description: Threat modeling, security review, and vulnerability assessment
hats: [threat-modeler, red-team, blue-team, security-reviewer]
review: external
unit_types: [security, backend]
inputs: [behavioral-spec, implementation]
---
```

- **threat-modeler** hat: STRIDE threat modeling for all data flows and trust boundaries
- **red-team** hat: attack surface analysis, injection testing, auth bypass attempts
- **blue-team** hat: defense verification, security control validation, monitoring coverage
- **security-reviewer** hat: verify all threats have mitigations, check OWASP Top 10 coverage
- Review `external` — security findings require team review before the intent ships
- This stage is always adversarial — the hat sequence IS the review
- Criteria guidance: OWASP Top 10 coverage, auth boundary testing, data protection requirements, input validation
- Outputs: `outputs/THREAT-MODEL.md` (scope: intent), `outputs/VULN-REPORT.md` (scope: intent)

### Hat Section Content

Each hat section in the STAGE.md body follows this pattern:

```markdown
## <hat-name>

### Focus
- Bullet points describing what this hat does

### Produces
- Artifact types this hat generates

### Reads
- What prior artifacts this hat consumes

### Anti-patterns
- What this hat should NOT do
```

This replaces the old `plugin/hats/*.md` files — all hat instructions live inline in the stage that uses them.

## Success Criteria

- [ ] All 4 ideation studio stage files exist with complete frontmatter and body
- [ ] All 6 software studio stage files exist with complete frontmatter and body
- [ ] Every stage has `hats`, `review`, `unit_types`, and `inputs` in frontmatter
- [ ] Every stage has an `outputs/` directory with at least one output doc
- [ ] Every output doc has `name`, `location`, `scope`, `format`, `required` in frontmatter
- [ ] Every stage body has sections for each hat defined in frontmatter
- [ ] Every stage body has `## Criteria Guidance` and `## Completion Signal` sections
- [ ] Input/output chains are consistent: every `inputs` reference appears as an output `name` in a prior stage's `outputs/` directory
- [ ] Software stage review modes match spec: inception=auto, design=ask, product=external, development=ask, operations=auto, security=external
- [ ] Ideation stage review modes match spec: research=auto, create=ask, review=ask, deliver=auto
- [ ] Hat sections provide actionable guidance (not just labels)
- [ ] Criteria guidance sections include good/bad examples

## Risks

- **Content quality**: Hat instructions need to be genuinely useful, not placeholder text. Mitigation: adapt content from existing `plugin/hats/*.md` files and `plugin/passes/*.md` (now stages) which have battle-tested guidance.
- **Input/output mismatch**: If stage A's outputs include `x` and `y` but stage B's inputs list `[x, z]`, the pipeline has a gap. Mitigation: trace the full input/output chain for each studio before writing files.
- **Ideation generality**: The ideation studio must work for ANY domain (marketing, hardware, legal, etc.). Mitigation: keep hat descriptions generic and outcome-focused rather than domain-specific.

## Boundaries

This unit writes STAGE.md content and `outputs/` directory docs for both studios. It does NOT create the studio infrastructure (unit-04), the orchestrator (unit-06), or remove the old hats directory (unit-07). The stage files and output docs are passive definitions — they become active when the orchestrator reads them.
