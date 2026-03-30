---
intent: adversarial-review-phase
created: 2026-03-30
status: active
---

# Discovery Log: Adversarial Review Phase

Elaboration findings persisted during Phase 2.5 domain discovery.
Builders: read section headers for an overview, then dive into specific sections as needed.

## Codebase Context

**Stack:** Bash (plugin shell libraries), Markdown (skill/hat definitions, specs), YAML (workflows, config), JavaScript (Playwright worker for screenshots), Next.js 15 (website)
**Architecture:** Monorepo with three components: `plugin/` (Claude Code plugin), `website/` (Next.js 15 static site), `website/content/papers/` (methodology paper). Plugin uses skill-based architecture with `skills/*/SKILL.md` definitions, `hats/*.md` role definitions, `lib/*.sh` shell libraries, and `workflows.yml` for named workflow sequences.
**Conventions:**
- Skills use YAML frontmatter for metadata (`description`, `allowed-tools`, `context: fork` for subagents, `user-invocable: false` for internal skills)
- Subagent skills follow a brief-file pattern: orchestrator writes `.briefs/elaborate-{name}.md`, subagent reads brief, does work, writes `.briefs/elaborate-{name}-results.md`
- Hats use YAML frontmatter (`name`, `description`) and structured sections (Overview, Parameters, Prerequisites, Steps, Success Criteria, Error Handling)
- Elaboration phases are numbered (0, 0.5, 1, 2, 2.25, 2.5, 3, 4, 5, 5.5, 5.6, 5.75, 5.8, 5.9, 5.95, 6, 6.25, 6.5+6.75, 7, 8)
- Git commits follow `elaborate({slug}): {action}` format during elaboration
- State management via `lib/state.sh` (file-based, atomic writes)
- Config via `lib/config.sh` with YAML settings at `.ai-dlc/settings.yml`
- Telemetry via `lib/telemetry.sh`
**Concerns:**
- Phase 7 (Spec Review) currently runs a lightweight checklist-style review — completeness, consistency, YAGNI — but does NOT do adversarial analysis (contradictions, hidden complexity, assumption challenges, dependency stress-testing)
- No existing mechanism for auto-applying fixes to specs during elaboration — Phase 7 presents findings to user but has no auto-fix pathway
- The integrate skill handles cross-unit validation post-execution but not pre-execution adversarial review

## Codebase Pattern: Subagent Delegation in Elaborate Skill

The elaborate skill uses a consistent delegation pattern for autonomous sub-tasks. Three existing examples:

### Pattern: Brief-Write-Invoke-Read

1. **Write brief** to `.ai-dlc/{slug}/.briefs/elaborate-{name}.md` with YAML frontmatter + markdown body containing all context the subagent needs
2. **Commit the brief** immediately: `git add ... && git commit -m "elaborate({slug}): write {name} brief"`
3. **Invoke subagent** via `Agent({ subagent_type: "general-purpose", description: "elaborate-{name}: {slug}", prompt: "Run the /ai-dlc:elaborate-{name} skill..." })`
4. **Read results** from `.ai-dlc/{slug}/.briefs/elaborate-{name}-results.md` — parse YAML `status` field (success/error/skipped)
5. **Commit results** and any artifacts

### Existing Subagent Skills

| Skill | Phase | Brief File | Results File | Allowed Tools |
|---|---|---|---|---|
| `elaborate-discover` | 2.5 | `elaborate-discover.md` | `elaborate-discover-results.md` | Read, Write, Glob, Grep, Bash, Agent, WebSearch, WebFetch, ToolSearch, MCP read-only |
| `elaborate-wireframes` | 6.25 | `elaborate-wireframes.md` | `elaborate-wireframes-results.md` | Read, Write, Glob, Grep, Bash, MCP read-only |
| `elaborate-ticket-sync` | 6.5+6.75 | `elaborate-ticket-sync.md` | `elaborate-ticket-sync-results.md` | Read, Write, Glob, Grep, Bash, ToolSearch, MCP read-only, ticketing write tools |

### Subagent Skill Frontmatter Pattern

```yaml
---
description: (Internal) Autonomous {purpose} for AI-DLC elaboration
context: fork
agent: general-purpose
user-invocable: false
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
  # plus task-specific tools
---
```

### Key Observations for New Subagent

- All subagent skills use `context: fork` and `agent: general-purpose`
- All subagent skills are `user-invocable: false`
- All subagent skills state: "You have NO access to `AskUserQuestion`. All work is fully autonomous."
- Results use YAML frontmatter with `status: success|error|skipped` and `error_message`
- The orchestrator (elaborate SKILL.md) handles user interaction based on results
- Subagents commit their work incrementally (each finding separately)
- The adversarial review subagent should follow this exact pattern

## Codebase Pattern: Phase 7 Spec Review (Current)

Phase 7 at line 1812 of `plugin/skills/elaborate/SKILL.md` is the existing spec review. It:

1. Launches a `general-purpose` subagent inline (NOT via a separate skill file — it's a prompt-only subagent)
2. The subagent reads `intent.md` and `unit-*.md` files
3. Reviews against a checklist: completeness (criteria, descriptions, dependencies, disciplines), consistency (numbering, slugs, verifiability, boundaries), YAGNI (scope, over-specification)
4. Reports PASS/WARN/FAIL
5. If FAIL, presents findings to user via `AskUserQuestion`
6. If PASS/WARN, outputs summary and proceeds

**Critical gap:** Phase 7 does NOT:
- Challenge assumptions in the spec
- Find contradictions between units (e.g., unit A says X is the source of truth, unit B assumes Y)
- Stress-test dependency ordering (e.g., can unit 3 really start before unit 2 is done?)
- Probe for hidden complexity (e.g., "this looks simple but actually requires...")
- Validate scope/YAGNI deeply (beyond surface-level "no extra units")
- Suggest concrete fixes for issues found
- Auto-apply high-confidence fixes

**Phase 7.5 fills this gap** by adding deep adversarial analysis after the lightweight checklist review.

## Codebase Pattern: Reviewer Hat Confidence Scoring

The reviewer hat (`plugin/hats/reviewer.md`) uses a three-tier confidence scoring system:

- **High**: Deterministic — test fails, type error, missing import, criterion unmet. Auto-fixable.
- **Medium**: Likely correct but context-dependent — naming, structure, design choices.
- **Low**: Subjective or uncertain — style preferences, alternative approaches, nice-to-haves.

Rules:
- High-confidence issues MUST block approval
- Low-confidence issues MUST NOT block approval
- Findings are grouped by confidence level

**This pattern should be reused by the adversarial review.** The brief intent says "high-confidence fixes applied automatically, low-confidence issues prompt user for clarification." This maps directly to the existing confidence scoring pattern.

## Codebase Pattern: Red Team / Blue Team Hats

The `adversarial` workflow already exists in `plugin/workflows.yml`:
```yaml
adversarial:
  description: Security-focused with Red/Blue team phases
  hats: [planner, builder, red-team, blue-team, reviewer]
```

The Red Team hat (`plugin/hats/red-team.md`) provides an adversarial mindset for security testing of implementations. Key patterns:
- Enumerates attack surface systematically
- Documents findings with severity (Critical/High/Medium/Low)
- Does NOT fix — only documents
- Anti-rationalization table to prevent premature "looks good" conclusions

**Key distinction:** Red Team operates on *implementations* (code). The new adversarial review operates on *specifications* (intent + unit markdown files). Different target, similar adversarial mindset.

## Codebase Pattern: Elaborate Phase Numbering

Current phase sequence:
```
0 → 0.5 → 1 → 2 → 2.25 → 2.5 → 3 → 4 → 5 → 5.5 → 5.6 → 5.75 → 5.8 → 5.9 → 5.95 → 6 → 6.25 → 6.5+6.75 → 7 → 8
```

Phase 7.5 slots between Phase 7 (Spec Review) and Phase 8 (Handoff). This is a clean insertion point — Phase 7 validates structural correctness, Phase 7.5 validates semantic correctness, Phase 8 hands off to execution.

## Codebase Pattern: Integration Skill Cross-Unit Validation

The integrate skill (`plugin/skills/integrate/SKILL.md`) validates cross-unit interactions POST-execution:
- Verifies merged state integrity
- Runs full backpressure suite (tests, lint, types)
- Checks intent-level success criteria
- Verifies cross-unit boundaries, shared state, APIs
- Checks for emergent issues from unit combination
- Cross-unit deployment validation

The adversarial review should do the *pre-execution* version of some of these checks on the specs:
- Cross-unit contract consistency (does unit A's output match unit B's expected input?)
- Dependency ordering validation (can units actually execute in the specified order?)
- Cross-cutting concern completeness (are all cross-cutting concerns addressed?)

**These are spec-level analogs of what integrate does at the code level.**

