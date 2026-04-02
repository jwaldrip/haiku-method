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
Update all documentation, the methodology paper, and the website to reflect the H·AI·K·U rebrand and studio/stage architecture. This includes the terminology table, concept mappings, and user-facing guides.

## Discipline
documentation - Paper, website content, and docs updates.

## Technical Specification

### CLAUDE.md updates
- Rename all AI-DLC references to H·AI·K·U
- Update terminology table:
  | H·AI·K·U | Description |
  |----------|-------------|
  | Studio | Named lifecycle template |
  | Stage | Lifecycle phase (plan → build → review) |
  | Unit | Discrete piece of work |
  | Bolt | Iteration cycle within a unit |
- Update concept-to-implementation mapping for studios/stages
- Update key file locations for new directory structure

### Paper updates (website/content/papers/ai-dlc-2026.md)
- Rebrand title and throughout
- Add Studio/Stage section explaining the lifecycle model
- Update Pass references → Stage
- Add Persistence section explaining domain-agnostic capability
- Add examples: software studio, ideation studio

### Website docs (website/content/docs/)
- Update all concept docs for stage terminology
- Add studio configuration guide
- Add custom stage creation guide
- Update elaboration docs to reflect unified stage loop
- Remove references to separate elaborate/execute commands

### Website pages
- Update homepage content referencing AI-DLC
- Update blog posts as appropriate (preserve historical accuracy)
- Update any code examples using .ai-dlc/ paths

## Success Criteria
- [ ] CLAUDE.md terminology table reflects Studio → Stage → Unit → Bolt hierarchy
- [ ] Paper describes the studio/stage architecture
- [ ] No remaining "pass" references in docs (except historical)
- [ ] Website builds successfully (bun run build in website/)
- [ ] All internal links resolve correctly

## Risks
- **SEO impact**: Renaming may affect search indexing. Mitigation: redirects from old URLs if applicable.
- **Historical accuracy**: Blog posts and changelog entries should preserve the timeline. Mitigation: only update forward-looking content, not historical records.

## Boundaries
This unit handles documentation only. Code changes are in units 01-03.
