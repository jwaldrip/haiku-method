---
intent: haiku-rebrand
created: 2026-04-02T19:46:00Z
status: active
---

# Discovery Log: H·AI·K·U Rebrand

Elaboration findings from the April 2, 2026 architecture design session.

## Architecture Decision: Studio/Stage/Persistence Model

The AI-DLC system is being rebranded and rearchitected as H·AI·K·U — a domain-agnostic lifecycle orchestration system. The key insight: all structured work flows through stages of planning, building, and reviewing. Software development is one lifecycle; marketing, hardware, legal are others.

### Core Concepts

- **Studio** — a named lifecycle for a specific domain. Declares stage order and persistence layer.
- **Stage** — a lifecycle phase. Plans, builds, and reviews its own work. Defines its own hats (roles). One STAGE.md contains everything.
- **Persistence** — how work is saved. Git for software, Notion for content, filesystem for generic. The studio declares its type.
- **Knowledge** — two layers: global pool (project-level, persists across intents) and intent artifacts (accumulated as stages complete).

### Architecture Decision: Unified Stage Loop

The elaborate/execute separation is eliminated. Each stage internally: plan → build → adversarial review → review gate. The user doesn't switch between /elaborate and /execute. A stage just runs.

### Architecture Decision: Hats in Stages

Hats (roles) move from plugin/hats/ directory into each STAGE.md. The hat sequence defined in the stage IS the build workflow. No separate workflows.yml. Security stage is always adversarial because its hats are threat-modeler → red-team → blue-team → reviewer.

### Architecture Decision: Default Ideation Studio

Every project has a studio. The default is "ideation" with universal stages: research → create → review → deliver. Domain-specific studios (software, marketing) specialize this.

### Architecture Decision: Review Gates

Every stage runs automatically. The review gate controls what happens AFTER: auto (advance immediately), ask (pause for user), external (request team review / PR).

### Architecture Decision: Continuous vs Discrete

Not "single-stage vs multi-stage." Both modes run through the same stages. Continuous = autopilot drives transitions, user reviews at gates. Discrete = user explicitly invokes each stage. The choice is per-intent.

### Architecture Decision: Persistence Abstraction

Git is the software studio's persistence adapter, not a system-level assumption. The studio declares `persistence: { type: git, delivery: pull-request }`. Other studios use other adapters.

### Architecture Decision: Product Review is External

The product stage's review gate is `external` — it's the go/no-go decision boundary where the team decides whether to actually build the thing.

## Codebase Context

**Stack:** TypeScript, Bash (shell scripts), Next.js 15 (website), Markdown (specs/docs)
**Architecture:** Claude Code plugin (plugin/), static website (website/), methodology paper
**Conventions:** YAML frontmatter in markdown, SKILL.md for skill definitions, shell libraries in plugin/lib/

## What Dissolves

- `plugin/hats/` directory — hats move into STAGE.md files
- `plugin/workflows.yml` — stages define their own hat sequences
- Workflow selection sub-skill — not needed
- `phases/ELABORATION.md` and `phases/EXECUTION.md` — stage body is context for everything
- The elaborate/execute command split — replaced by unified stage loop
- Software-only assumption — persistence adapters make it domain-agnostic

## What Already Changed (This Session)

- `pass` renamed to `stage` across all plugin files, hooks, schemas, types
- `plugin/passes/` → `plugin/stages/` (then further into studios)
- Stage definitions created with FSM model (requires/produces)
- Studio infrastructure: studio.sh, stage.sh, STUDIO.md
- Built-in software studio with design/product/dev stages
- STUDIO-SPEC.md written
- HTML architecture visualization (3 versions in Downloads)
