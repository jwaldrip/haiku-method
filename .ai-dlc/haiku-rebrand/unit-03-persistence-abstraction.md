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
Extract all git-specific operations behind a persistence interface so studios can declare their own persistence type. The git adapter becomes the default for the software studio; the filesystem adapter is a basic fallback for non-VCS domains. The studio's STUDIO.md declares which adapter to use, and the stage orchestrator loads the correct one at runtime.

## Discipline
backend - Shell library abstraction layer.

## Technical Specification

### Persistence Interface (`plugin/lib/persistence.sh`)

A dispatcher that sources the correct adapter based on the active studio's persistence config and delegates all calls. Functions follow a `persistence_*` naming convention.

```bash
#!/bin/bash
# persistence.sh — Persistence abstraction layer
#
# Loads the adapter declared in the active studio's STUDIO.md and delegates.
# Usage:
#   source persistence.sh
#   persistence_init "$studio_name"    # Load adapter
#   persistence_create_workspace ...   # Delegate to adapter

# ── Interface Functions (signatures) ──────────────────────────────────

# persistence_init <studio_name>
#   Reads STUDIO.md persistence.type, sources the matching adapter.
#   Must be called before any other persistence_* function.
#   Sets: _PERSISTENCE_TYPE, _PERSISTENCE_DELIVERY

# persistence_create_workspace <intent_slug> <base_ref>
#   Create an isolated workspace for an intent.
#   Git: git worktree add -B "haiku/{slug}/main" ".haiku/worktrees/{slug}" <base_ref>
#   Filesystem: mkdir -p ".haiku/workspaces/{slug}"
#   Returns: workspace path (absolute)

# persistence_save <message> [files...]
#   Save current work with a descriptive message.
#   Git: git add <files> && git commit -m <message>
#   Filesystem: cp files to workspace with timestamp metadata

# persistence_save_all <message>
#   Save all tracked changes.
#   Git: git add -A && git commit -m <message>
#   Filesystem: snapshot entire workspace directory

# persistence_version_history <intent_slug> [count]
#   List recent versions (most recent first).
#   Git: git log --oneline -n <count>
#   Filesystem: ls -lt workspace/versions/

# persistence_diff [ref]
#   Show changes since last save (or since ref).
#   Git: git diff [ref]
#   Filesystem: diff against last snapshot

# persistence_create_review <intent_slug> <title> <body>
#   Request review of completed work.
#   Git: gh pr create --title <title> --body <body>
#   Filesystem: write review-request.md to workspace

# persistence_deliver <intent_slug>
#   Deliver completed work to the main line.
#   Git: merge PR (or git merge if no PR)
#   Filesystem: cp workspace/* to output/

# persistence_cleanup <intent_slug>
#   Clean up workspace after delivery.
#   Git: git worktree remove, prune
#   Filesystem: rm -rf workspace

# persistence_branch_name <intent_slug> [unit_slug]
#   Return the branch/ref name for an intent or unit.
#   Git: "haiku/{slug}/main" or "haiku/{slug}/{unit-number}-{unit-slug}"
#   Filesystem: "" (no branching concept)

# persistence_current_ref
#   Return current version reference.
#   Git: git rev-parse HEAD
#   Filesystem: latest timestamp

# persistence_workspace_path <intent_slug>
#   Return the workspace directory path.
#   Git: .haiku/worktrees/{slug}
#   Filesystem: .haiku/workspaces/{slug}

# persistence_is_available
#   Check if the adapter's prerequisites are met.
#   Git: git rev-parse --git-dir succeeds
#   Filesystem: always true
```

### Git Adapter (`plugin/lib/adapters/git.sh`)

Wraps existing git operations. This is a thin adapter — the implementation already exists scattered across skills and hooks; this consolidates it.

```bash
#!/bin/bash
# adapters/git.sh — Git persistence adapter
#
# Implements the persistence interface using git + gh CLI.

_persistence_git_create_workspace() {
  local slug="$1" base_ref="$2"
  local branch="haiku/${slug}/main"
  local worktree=".haiku/worktrees/${slug}"
  
  # Ensure .haiku/worktrees/ is gitignored
  # ... (existing logic from execute/SKILL.md and resume/SKILL.md)
  
  git worktree add -B "$branch" "$worktree" "$base_ref"
  echo "$(pwd)/$worktree"
}

_persistence_git_save() {
  local message="$1"; shift
  local files=("$@")
  if [ ${#files[@]} -gt 0 ]; then
    git add "${files[@]}"
  fi
  git commit -m "$message"
}

_persistence_git_save_all() {
  local message="$1"
  git add -A
  git commit -m "$message"
}

_persistence_git_create_review() {
  local slug="$1" title="$2" body="$3"
  git push -u origin "haiku/${slug}/main"
  gh pr create --title "$title" --body "$body"
}

_persistence_git_deliver() {
  local slug="$1"
  # Merge PR or direct merge depending on config
  # ... (existing logic from execute delivery phase)
}

_persistence_git_cleanup() {
  local slug="$1"
  local worktree=".haiku/worktrees/${slug}"
  [ -d "$worktree" ] && git worktree remove --force "$worktree" 2>/dev/null
  git worktree prune
}

# ... etc for all interface functions
```

#### Existing git calls that route through the adapter

These are the specific call sites across the codebase that currently make direct git calls and must be updated to use `persistence_*` functions:

**Workspace management:**
| Current location | Current code | Adapter call |
|------------------|-------------|--------------|
| `execute/SKILL.md` (line ~208) | `git worktree add -B "$INTENT_BRANCH" "$INTENT_WORKTREE" "$DEFAULT_BRANCH"` | `persistence_create_workspace "$INTENT_SLUG" "$DEFAULT_BRANCH"` |
| `resume/SKILL.md` (line ~136) | `git worktree add -B "$INTENT_BRANCH" "$INTENT_WORKTREE" "$DEFAULT_BRANCH"` | `persistence_create_workspace "$INTENT_SLUG" "$DEFAULT_BRANCH"` |
| `reset/SKILL.md` (line ~104-111) | `git worktree remove --force` + `git worktree prune` | `persistence_cleanup "$INTENT_SLUG"` |

**Saving work:**
| Current location | Current code | Adapter call |
|------------------|-------------|--------------|
| `setup/SKILL.md` (line ~564) | `git add .haiku/settings.yml && git commit -m "..."` | `persistence_save "haiku: configure project settings" ".haiku/settings.yml"` |
| `setup/SKILL.md` (line ~285) | `git add .haiku/providers/{type}.md && git commit -m "..."` | `persistence_save "haiku: configure {type} provider" ".haiku/providers/{type}.md"` |
| `adopt/SKILL.md` (line ~876-877) | `git add .haiku/${SLUG}/ && git commit -m "..."` | `persistence_save "adopt(${SLUG}): ..." ".haiku/${SLUG}/"` |
| `reflect/SKILL.md` (multiple) | `git add ... && git commit -m "..."` | `persistence_save "reflect(${SLUG}): ..." <files>` |
| `seed/SKILL.md` (line ~83) | `git add "$SEED_FILE" && git commit -m "..."` | `persistence_save "seed: plant ${SLUG}" "$SEED_FILE"` |
| `pressure-testing/SKILL.md` (line ~281-282) | `git add ... && git commit -m "..."` | `persistence_save "pressure-test(...): ..." <files>` |
| `inject-context.sh` (line ~163-164) | `git add ... && git commit -m "status: reconcile ..."` | `persistence_save "status: reconcile ..." <files>` |
| `enforce-iteration.sh` (line ~142-143) | `git add ... && git commit -m "status: mark ... completed"` | `persistence_save "status: mark ... completed" <files>` |

**Review/delivery:**
| Current location | Current code | Adapter call |
|------------------|-------------|--------------|
| `adopt/SKILL.md` (line ~960-962) | `git push -u origin ... && gh pr create ...` | `persistence_create_review "$SLUG" "$TITLE" "$BODY"` |
| `execute/SKILL.md` delivery phase | PR creation logic | `persistence_create_review "$SLUG" "$TITLE" "$BODY"` |

**Branch operations:**
| Current location | Current code | Adapter call |
|------------------|-------------|--------------|
| `adopt/SKILL.md` (line ~652-654) | `git checkout -b "$ADOPT_BRANCH"` | `persistence_create_workspace` (adapted) |
| `inject-context.sh` (line ~778) | `echo "git checkout -b ai-dlc/..."` (help text) | Update help text to use `persistence_branch_name` |
| `followup/SKILL.md` (line ~100) | `git branch -a \| grep 'haiku/...'` | `persistence_version_history` or direct branch scan |
| `dag.sh` (line ~716-741) | `git worktree list --porcelain` parsing | Wrap in adapter for workspace enumeration |

**State/context (read-only git calls that DON'T go through adapter):**
| Location | Code | Keep as-is? |
|----------|------|-------------|
| `config.sh` `detect_vcs()` | `git rev-parse --git-dir` | Yes — VCS detection is pre-adapter |
| `config.sh` `find_repo_root()` | `git rev-parse --show-toplevel` | Yes — repo root is pre-adapter |
| `config.sh` `resolve_default_branch()` | `git symbolic-ref`, `git rev-parse --verify` | Yes — branch resolution is config-level |
| `config.sh` `detect_project_maturity()` | `git rev-list --count`, `git ls-files` | Yes — maturity heuristic is read-only |
| `inject-context.sh` (line ~28) | `git branch --show-current` | Yes — context gathering, not persistence |
| `builder.md` (line ~378) | `git checkout {last-working-commit}` | Keep — this is recovery guidance, not persistence |

### Filesystem Adapter (`plugin/lib/adapters/filesystem.sh`)

Basic fallback for non-VCS domains (marketing studio, hardware docs, etc.).

```bash
#!/bin/bash
# adapters/filesystem.sh — Filesystem persistence adapter
#
# Plain directory-based persistence with timestamp versioning.
# No branching, no PRs. Workspaces are just directories.

_persistence_fs_create_workspace() {
  local slug="$1" base_ref="$2"  # base_ref ignored for filesystem
  local workspace=".haiku/workspaces/${slug}"
  mkdir -p "$workspace"
  echo "$(pwd)/$workspace"
}

_persistence_fs_save() {
  local message="$1"; shift
  local files=("$@")
  local ts=$(date +%Y%m%d-%H%M%S)
  local version_dir=".haiku/workspaces/${_PERSISTENCE_SLUG}/versions/${ts}"
  mkdir -p "$version_dir"
  # Copy files to version snapshot
  for f in "${files[@]}"; do
    [ -f "$f" ] && cp "$f" "$version_dir/"
  done
  echo "$message" > "$version_dir/.commit-message"
}

_persistence_fs_create_review() {
  local slug="$1" title="$2" body="$3"
  local review_file=".haiku/workspaces/${slug}/review-request.md"
  cat > "$review_file" << EOF
# Review Request: ${title}

${body}

---
Created: $(date -u +%Y-%m-%dT%H:%M:%SZ)
EOF
  echo "Review request written to: $review_file"
}

_persistence_fs_deliver() {
  local slug="$1"
  local workspace=".haiku/workspaces/${slug}"
  local output=".haiku/delivered/${slug}"
  mkdir -p "$output"
  cp -R "$workspace"/* "$output/"
  echo "Delivered to: $output"
}

_persistence_fs_cleanup() {
  local slug="$1"
  rm -rf ".haiku/workspaces/${slug}"
}

# ... etc
```

### STUDIO.md Persistence Config Schema

Added to the STUDIO.md frontmatter:

```yaml
persistence:
  type: git               # Required: git | filesystem
  delivery: pull-request  # Required: pull-request | merge | copy | export
```

| Field | Type | Values | Description |
|-------|------|--------|-------------|
| `persistence.type` | string | `git`, `filesystem` | Which adapter to load |
| `persistence.delivery` | string | `pull-request`, `merge`, `copy`, `export` | How completed work reaches the main line |

**Default values by studio:**
- Ideation: `{ type: filesystem, delivery: copy }`
- Software: `{ type: git, delivery: pull-request }`

### How the Stage Orchestrator Loads the Adapter

```bash
# In the stage orchestrator (stage/SKILL.md or run/SKILL.md):
source "${CLAUDE_PLUGIN_ROOT}/lib/persistence.sh"

# Read studio name from intent or settings
STUDIO_NAME=$(hku_frontmatter_get "studio" "$INTENT_DIR/intent.md")
: "${STUDIO_NAME:=$(get_setting_value "studio")}"
: "${STUDIO_NAME:=ideation}"

# Initialize persistence — loads the correct adapter
persistence_init "$STUDIO_NAME"

# From here, all persistence calls go through the interface:
WORKSPACE=$(persistence_create_workspace "$INTENT_SLUG" "$DEFAULT_BRANCH")
# ... build phase ...
persistence_save "stage(design): complete unit-01" "$UNIT_FILES"
# ... review gate ...
persistence_create_review "$INTENT_SLUG" "feat: $INTENT_TITLE" "$PR_BODY"
```

The `persistence_init` function:
1. Reads `persistence.type` from the studio's STUDIO.md frontmatter
2. Sources the matching adapter file from `plugin/lib/adapters/{type}.sh`
3. Sets `_PERSISTENCE_TYPE` and `_PERSISTENCE_DELIVERY` globals
4. Validates the adapter is available (e.g., git adapter checks `git rev-parse --git-dir`)

### Migration Strategy

1. Create `plugin/lib/persistence.sh` with the interface + dispatcher
2. Create `plugin/lib/adapters/git.sh` wrapping existing git operations
3. Create `plugin/lib/adapters/filesystem.sh` as basic fallback
4. Update stage orchestrator to call `persistence_init` at startup
5. Update skill files one at a time — replace direct `git add/commit/push/worktree` calls with `persistence_*` equivalents
6. Update hooks that make git calls (inject-context.sh, enforce-iteration.sh) to use persistence interface
7. Leave read-only git calls (detect_vcs, find_repo_root, branch --show-current) as-is — they're pre-adapter concerns

## Success Criteria
- [ ] `plugin/lib/persistence.sh` defines the dispatcher and all interface function signatures
- [ ] `plugin/lib/adapters/git.sh` implements all interface functions using git/gh
- [ ] `plugin/lib/adapters/filesystem.sh` implements all interface functions using plain directories
- [ ] `persistence_init` correctly reads `persistence.type` from STUDIO.md and sources the matching adapter
- [ ] Software studio STUDIO.md declares `persistence: { type: git, delivery: pull-request }`
- [ ] Ideation studio STUDIO.md declares `persistence: { type: filesystem, delivery: copy }`
- [ ] All workspace creation in skills (execute, resume, adopt) routes through `persistence_create_workspace`
- [ ] All save operations in skills and hooks route through `persistence_save` / `persistence_save_all`
- [ ] All PR creation routes through `persistence_create_review`
- [ ] All worktree cleanup routes through `persistence_cleanup`
- [ ] Read-only git calls (detect_vcs, find_repo_root, git branch --show-current) remain direct — they are NOT routed through the adapter
- [ ] A non-git studio using filesystem adapter can create workspaces, save, and deliver without errors
- [ ] Existing git-based workflows (software studio) continue to work identically through the git adapter
- [ ] All existing tests pass

## Risks
- **Git edge cases**: Worktree management, branch naming, and merge strategies have many edge cases baked into the current code. Mitigation: the git adapter is a thin wrapper around existing code, not a rewrite — preserve all existing logic.
- **Interface completeness**: The interface might miss operations needed by future adapters (e.g., Notion API, CAD file locking). Mitigation: start minimal with the documented interface; future adapters can extend with adapter-specific functions as long as the core interface is satisfied.
- **Hook interference**: Hooks like quality-gate.sh and enforce-iteration.sh make git commits directly. Routing these through the persistence layer requires careful testing to avoid breaking the Stop hook flow. Mitigation: test hooks in isolation after migration.
- **Performance**: Adding a function call indirection layer could slow hot paths (quality gate runs on every Stop). Mitigation: the adapter is just a function dispatch, not an RPC — overhead is negligible.

## Boundaries
This unit implements the abstraction and git/filesystem adapters only. It does NOT implement Notion, CAD, or other domain-specific adapters — those are future work when those studios are created. It does NOT change the persistence interface after initial creation — the interface is designed to be stable.
