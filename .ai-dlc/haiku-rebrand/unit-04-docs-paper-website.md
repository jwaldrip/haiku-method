---
status: pending
last_updated: ""
depends_on: [unit-01-mechanical-rebrand, unit-02-studio-stage-architecture]
branch: ai-dlc/haiku-rebrand/04-docs-paper-website
discipline: documentation
stage: ""
workflow: ""
ticket: ""
---

# unit-04-docs-paper-website

## Description
Update all documentation, the methodology paper, the website, and project configuration files to reflect the H·AI·K·U rebrand and studio/stage architecture. This is the documentation companion to units 01-03 — every user-facing reference must be accurate to the new system.

## Discipline
documentation - Paper, website content, docs, and project config updates.

## Technical Specification

### CLAUDE.md Updates

The root `CLAUDE.md` requires comprehensive updates across all sections.

#### Project header
- "AI-DLC Project" -> "H·AI·K·U Project"
- "Three-component project" description updated to reflect studio/stage architecture

#### Terminology table (replace entirely)

Old:
```
| AI-DLC Term | Agile Equivalent | Description |
| Intent | Feature / Epic | The overall thing being built |
| Unit | Ticket / Story | A discrete piece of work within an intent |
| Bolt | Sprint | The iteration cycle an agent runs within a unit |
| Pass | (no equivalent) | Typed iteration through a disciplinary lens |
```

New:
```
| H·AI·K·U Term | Agile Equivalent | Description |
| Studio | (no equivalent) | Named lifecycle template — the team's development pipeline |
| Stage | (no equivalent) | A lifecycle phase with defined hats, review mode, and outputs |
| Unit | Ticket / Story | A discrete piece of work within an intent |
| Bolt | Sprint | The iteration cycle an agent runs within a unit |
```

Note: Pass is removed (replaced by Stage). Studio is added. The hierarchy is now Studio -> Stage -> Unit -> Bolt.

#### Concept-to-implementation mapping (replace entirely)

Old table references Pass, plugin/hats/, workflows.yml, /ai-dlc:* commands. New:

```
| Concept | Paper Section | Plugin Implementation | Key Files |
| Studio | Studio Architecture | .haiku/studios/, plugin/studios/ | studio.sh, STUDIO.md |
| Stage | Stage Lifecycle | STAGE.md with inline hats | stage.sh, STAGE.md |
| Intent | Inception | .haiku/{slug}/intent.md | elaborate/SKILL.md |
| Unit | Construction | .haiku/{slug}/stages/{stage}/units/ | stage/SKILL.md |
| Bolt | Construction | iteration in state.json | stage/SKILL.md |
| Review Gate | Stage Lifecycle | review: field in STAGE.md | stage.sh |
| Knowledge | Knowledge Pools | .haiku/knowledge/ | knowledge.sh |
| Persistence | Persistence Layer | plugin/lib/persistence.sh + adapters/ | persistence.sh |
| Operating Modes | Operating Modes | discrete=/haiku:stage, continuous=/haiku:run, auto=/haiku:autopilot | stage, run, autopilot skills |
```

#### Key file locations (replace entirely)

Old references plugin/hats/, plugin/workflows.yml, .ai-dlc/ paths. New:

```
| Purpose | Path |
| Paper | website/content/papers/haiku-2026.md |
| Plugin metadata | plugin/.claude-plugin/plugin.json |
| Plugin skills | plugin/skills/*/SKILL.md |
| Studios (built-in) | plugin/studios/{name}/STUDIO.md |
| Stages (built-in) | plugin/studios/{name}/stages/{stage}/STAGE.md |
| Studios (project) | .haiku/studios/{name}/STUDIO.md |
| Plugin hooks | plugin/hooks/*.sh + plugin/hooks/hooks.json |
| Plugin libraries | plugin/lib/*.sh |
| Persistence adapters | plugin/lib/adapters/*.sh |
| Plugin providers | plugin/providers/*.md + plugin/schemas/providers/*.json |
| Website docs | website/content/docs/ |
| Changelog | CHANGELOG.md |
```

#### Sync discipline table
Update all references from `.ai-dlc/` paths to `.haiku/` paths. Replace "hat/workflow" row with "stage" row. Add "studio" row.

#### Version management
No structural change, just rename any AI-DLC references.

### Sync Check Rule (`.claude/rules/sync-check.md`)

Replace entirely to reflect the new hierarchy:

- "After modifying plugin/skills/ or plugin/hats/" -> "After modifying plugin/skills/ or plugin/studios/"
- Remove hats references — hats are now inline in STAGE.md
- Add studio/stage consistency checks
- Update terminology reminders:
  - Remove "Pass = typed disciplinary iteration" (concept removed)
  - Add "Studio = named lifecycle template"
  - Add "Stage = lifecycle phase with hats, review mode, and outputs"
  - Keep "Bolt = iteration cycle" and "Unit = discrete piece of work"
  - Keep "Intent/Unit/Bolt are the three-layer hierarchy" but update to "Studio/Stage/Unit/Bolt are the four-layer hierarchy"

### Paper Updates (`website/content/papers/ai-dlc-2026.md`)

The paper filename itself may need renaming (to `haiku-2026.md`), but this depends on URL strategy. At minimum, all content within must be updated.

#### Sections to rewrite

| Current Section Header | Action | Notes |
|----------------------|--------|-------|
| `## Preface: The State of AI-Driven Development` | Rebrand references | AI-DLC -> H·AI·K·U throughout |
| `## Context` | Rebrand references | Minor text updates |
| `### Why AI-DLC Over Ad-Hoc AI Assistance` | Rename section + rebrand | "Why H·AI·K·U Over..." |
| `## Core Principles` | Rebrand all sub-sections | |
| `### Three Operating Modes: HITL, OHOTL, and AHOTL` | Update commands | /ai-dlc:execute -> /haiku:stage, /ai-dlc:autopilot -> /haiku:autopilot |
| `### Embrace the Collapsing SDLC` | Rebrand + add studio concept | This is where studios conceptually fit |
| `### Iteration Through Passes` | **REWRITE as "Iteration Through Stages"** | Pass -> Stage, add studio context, explain lifecycle phases |
| `### Memory Providers Expand Knowledge` | Rebrand paths | .ai-dlc/ -> .haiku/ |
| `### Completion Criteria Enable Autonomy` | Minor rebrand | |
| `### Everyone Becomes a Builder` | Minor rebrand | |
| `### Streamline Responsibilities` | Minor rebrand + update hat references | Hats now in STAGE.md, not plugin/hats/ |
| `## Core Framework` | Rebrand | |
| `## Intent: User Authentication System` | Update paths and commands | .ai-dlc/ -> .haiku/, commands renamed |
| `### Phases & Rituals` | **REWRITE** | Elaborate/execute phases become stage lifecycle |
| `### The Workflow` | **REWRITE** | Workflows are replaced by stage hat sequences |
| `### Lifecycle Entry Points` | **REWRITE** | /ai-dlc:* -> /haiku:*, add /haiku:stage and /haiku:run |
| `### Named Workflows` | **REWRITE or REMOVE** | Workflows replaced by stages |
| `## AI-DLC 2026 in Action: Greenfield Development` | Rebrand + update example | |
| `## AI-DLC 2026 in Action: Brownfield Development` | Rebrand + update example | |
| `## Decision Framework: Selecting Operating Mode` | Update commands | |
| `## Implementing Autonomous Bolts` | Rebrand | |
| `## Adoption Path` | Rebrand | |
| `## Measuring AI-DLC Effectiveness` | Rebrand section title + content | |
| `## Glossary` | **REWRITE** | Add Studio, Stage; remove Pass; update all definitions |
| `## References` | Minor updates | |

#### New sections to add

| Section | Location | Content |
|---------|----------|---------|
| Studio Architecture | After Core Principles or within Core Framework | Define studios, explain domain-agnostic lifecycle model |
| Stage Lifecycle | Within Studio Architecture | Plan -> Build -> Review loop, review gates, artifact flow |
| Persistence Layer | After Stage Lifecycle | Adapter model, git vs filesystem, studio config |
| Example: Ideation Studio | In examples section | Show non-software use case |

### Website Docs Updates (`website/content/docs/`)

Every docs file needs review. Here is the file-by-file assessment:

| File | Action | Key Changes |
|------|--------|-------------|
| `index.md` | Rebrand | AI-DLC -> H·AI·K·U, update tagline |
| `quick-start.md` | Rebrand + restructure | Commands renamed, .ai-dlc/ -> .haiku/, mention studios |
| `installation.md` | Rebrand | Plugin name change |
| `concepts.md` | **REWRITE** | Add Studio/Stage to hierarchy, remove Pass, update all concept definitions |
| `elaboration.md` | **REWRITE** | Elaborate becomes the plan phase of a stage; update entire flow |
| `workflows.md` | **REWRITE or REMOVE** | Workflows replaced by stage hat sequences; redirect to stage docs |
| `hats.md` | **REWRITE** | Hats now defined in STAGE.md, not standalone files; explain new model |
| `guide-developer.md` | Rebrand + update | Commands renamed, paths updated |
| `guide-designer.md` | Rebrand + update | Commands renamed, design stage reference |
| `guide-manager.md` | Rebrand + update | Commands renamed |
| `guide-tech-lead.md` | Rebrand + update | Commands renamed |
| `guide-ai.md` | Rebrand + update | Commands renamed, architecture overview |
| `providers.md` | Rebrand paths | .ai-dlc/ -> .haiku/ |
| `stack-config.md` | Rebrand paths | .ai-dlc/ -> .haiku/ |
| `operations-guide.md` | Rebrand + update | /ai-dlc:operate -> /haiku:operate |
| `operation-schema.md` | Rebrand | Minor path/command updates |
| `cowork.md` | Rebrand | Commands and paths |
| `example-feature.md` | Rebrand + update | Full example with new commands and paths |
| `example-bugfix.md` | Rebrand + update | Full example with new commands and paths |
| `community.md` | Rebrand | Project name references |
| `assessment.md` | Rebrand | |
| `checklist-first-intent.md` | Rebrand + update | Commands and paths |
| `checklist-team-onboarding.md` | Rebrand + update | Commands and paths |
| `adoption-roadmap.md` | Rebrand | |

#### New docs pages to create

| File | Content |
|------|---------|
| `studios.md` | Studio concept, built-in studios (ideation, software), custom studio creation |
| `stages.md` | Stage lifecycle, STAGE.md schema, hat sections, review gates |
| `persistence.md` | Persistence abstraction, adapter types, configuration in STUDIO.md |

### Blog Posts

| File | Action | Rationale |
|------|--------|-----------|
| `introducing-ai-dlc.md` | **Leave as historical** | This is a dated announcement — preserve original terminology with a note |
| `ai-dlc-is-a-harness.md` | **Leave as historical** | Conceptual post, add editor's note about rebrand if desired |
| `dark-factories-and-the-loop.md` | **Leave as historical** | Philosophy post, terminology is contextual |
| `agent-teams-support.md` | **Leave as historical** | Feature announcement |
| `first-class-passes.md` (in content/blog/) | **Update or add note** | References "passes" which are now "stages" — add a note or redirect |
| `the-agnostic-builder.md` (in content/blog/) | **Review** | May already reference new concepts |

Blog posts that are historical announcements stay as-is (they're timestamped records). If any post makes forward-looking claims about the system that are now wrong, add a brief editor's note at the top.

### Website Pages

| File/Component | Action | Key Changes |
|----------------|--------|-------------|
| `website/app/HomeContent.tsx` | Rebrand | AI-DLC -> H·AI·K·U in hero, features, code examples |
| `website/app/blog/[slug]/page.tsx` | Check | May need metadata updates |
| `website/app/blog/page.tsx` | Check | May need metadata updates |
| `website/lib/blog.ts` | Check | May need metadata updates |

### Root Files

| File | Action | Key Changes |
|------|--------|-------------|
| `README.md` | Rebrand | Project name, description, all AI-DLC references |
| `.gitignore` | Update paths | `.ai-dlc/worktrees/` -> `.haiku/worktrees/`, add `.haiku/workspaces/` |
| `CHANGELOG.md` | **DO NOT EDIT** | CI-managed. Historical entries stay as-is. |

### Feed/RSS Updates

If feed files (RSS, Atom, JSON) reference "AI-DLC" in their metadata (title, description), update to "H·AI·K·U". Check:
- `website/app/feeds/` directory
- Feed generation in build scripts

## Success Criteria
- [ ] CLAUDE.md terminology table shows Studio -> Stage -> Unit -> Bolt (4-level hierarchy, no Pass)
- [ ] CLAUDE.md concept-to-implementation mapping references studios, STAGE.md, persistence.sh, new commands
- [ ] CLAUDE.md key file locations reference new paths (plugin/studios/, .haiku/, plugin/lib/adapters/)
- [ ] `.claude/rules/sync-check.md` references studios instead of hats directory, removes Pass terminology
- [ ] Paper "Iteration Through Passes" section is rewritten as "Iteration Through Stages"
- [ ] Paper glossary defines Studio, Stage; removes Pass; updates all other terms
- [ ] Paper examples use .haiku/ paths and /haiku:* commands
- [ ] Paper adds Studio Architecture, Stage Lifecycle, and Persistence Layer sections
- [ ] `website/content/docs/concepts.md` defines the full Studio -> Stage -> Unit -> Bolt hierarchy
- [ ] `website/content/docs/elaboration.md` describes elaboration as the plan phase of a stage
- [ ] `website/content/docs/workflows.md` is rewritten or removed (replaced by stage hat sequences)
- [ ] `website/content/docs/hats.md` explains that hats live in STAGE.md, not standalone files
- [ ] New docs pages exist: `studios.md`, `stages.md`, `persistence.md`
- [ ] No remaining "pass" references in docs (except historical blog posts and changelog)
- [ ] No remaining "/ai-dlc:" command references in docs
- [ ] No remaining ".ai-dlc/" path references in docs
- [ ] Blog posts are preserved as historical records (no rewriting history)
- [ ] Website builds successfully (`bun run build` in website/)
- [ ] All internal doc links resolve correctly
- [ ] Homepage reflects H·AI·K·U branding

## Risks
- **SEO impact**: Renaming URLs may affect search indexing. Mitigation: maintain redirects from old paths if the paper URL changes. Blog posts keep original URLs.
- **Historical accuracy**: Blog posts and changelog entries must preserve the original timeline. Mitigation: only update forward-looking content; add editor's notes to historical posts if needed.
- **Broken links**: Renaming doc pages (workflows.md -> stages.md) may break external links. Mitigation: keep old filenames as redirects or thin pages pointing to the new location.
- **Scope creep**: The paper is ~1800 lines. A full rewrite risks introducing conceptual errors. Mitigation: focus on terminology replacement and structural additions (new sections for studios/stages/persistence); don't rewrite sections that are conceptually unchanged.

## Boundaries
This unit handles documentation only. Code changes are in units 01-03. The CHANGELOG.md is CI-managed and must not be manually edited.
