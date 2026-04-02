---
status: pending
last_updated: ""
depends_on: [unit-02-studio-stage-architecture]
branch: ai-dlc/haiku-rebrand/03-persistence-abstraction
discipline: backend
stage: ""
workflow: ""
ticket: ""
---

# unit-03-persistence-abstraction

## Description
Extract all git-specific operations behind a persistence interface so studios can declare their own persistence type. The git adapter becomes the default for the software studio. The interface supports workspace creation, saving, versioning, review, and delivery.

## Discipline
backend - Shell library abstraction layer.

## Technical Specification

### Persistence interface
Create `plugin/lib/persistence.sh` with generic functions:
- `persistence_create_workspace` — create an isolated workspace for an intent
- `persistence_save` — save current work (commit equivalent)
- `persistence_version_history` — list versions (log equivalent)
- `persistence_create_review` — request review (PR equivalent)
- `persistence_deliver` — deliver completed work (merge equivalent)
- `persistence_cleanup` — clean up workspace

### Git adapter
Create `plugin/lib/adapters/git.sh` — implements persistence interface using git:
- `persistence_create_workspace` → `git worktree add`
- `persistence_save` → `git add + git commit`
- `persistence_create_review` → `gh pr create`
- `persistence_deliver` → merge PR or `git merge`
- `persistence_cleanup` → `git worktree remove`

### Filesystem adapter (generic fallback)
Create `plugin/lib/adapters/filesystem.sh` — implements persistence using plain files:
- `persistence_create_workspace` → `mkdir`
- `persistence_save` → write files (with timestamp-based versioning)
- `persistence_create_review` → export for review
- `persistence_deliver` → copy to output directory

### Studio persistence config
The STUDIO.md frontmatter declares:
```yaml
persistence:
  type: git
  delivery: pull-request
```
The stage orchestrator reads `persistence.type` and sources the appropriate adapter.

### Migration
- Identify all direct git calls in skills, hooks, and lib files
- Replace with persistence interface calls
- Ensure all existing git-based workflows continue to work through the adapter

## Success Criteria
- [ ] `plugin/lib/persistence.sh` defines the generic interface
- [ ] `plugin/lib/adapters/git.sh` implements git operations through the interface
- [ ] `plugin/lib/adapters/filesystem.sh` implements basic filesystem persistence
- [ ] Software studio STUDIO.md declares `persistence: { type: git }`
- [ ] All existing git operations route through the adapter
- [ ] A non-git studio (filesystem) can create workspaces, save, and deliver
- [ ] All existing tests pass

## Risks
- **Git edge cases**: Worktree management, branch naming, and merge strategies have many edge cases. Mitigation: the git adapter is a thin wrapper around existing code, not a rewrite.
- **Interface completeness**: The interface might miss operations needed by future adapters. Mitigation: start minimal, expand as adapters are added.

## Boundaries
This unit implements the abstraction and git/filesystem adapters. It does NOT implement Notion, CAD, or other domain-specific adapters — those are future work when those studios are created.
