---
status: pending
last_updated: ""
depends_on: []
branch: ai-dlc/haiku-rebrand/01-mechanical-rebrand
discipline: backend
stage: ""
workflow: ""
ticket: ""
---

# unit-01-mechanical-rebrand

## Description
Mechanical find-and-replace of all AI-DLC references to H·AI·K·U across the entire codebase. This is a zero-logic change — no architectural modifications, just naming. Every identifier, path, command, function prefix, guard variable, environment variable, and user-facing string is updated.

## Discipline
backend - Systematic text replacement across shell scripts, markdown, TypeScript, JSON, and YAML files.

## Domain Entities
Every file in the repo that references "ai-dlc", "AI-DLC", ".ai-dlc/", `/ai-dlc:` commands, `dlc_` function prefixes, `aidlc_` telemetry prefixes, `_DLC_` guard variables, or `AI_DLC_` environment variables.

## Technical Specification

### Order of Operations

Renames must happen in dependency order to avoid breaking `source` chains mid-flight:

1. **Libraries** (`plugin/lib/*.sh`) — foundation layer, sourced by everything
2. **Hooks** (`plugin/hooks/*.sh` + `plugin/hooks/hooks.json`) — source libraries
3. **Skills** (`plugin/skills/*/SKILL.md`) — reference libraries and commands
4. **Schemas** (`plugin/schemas/`) — standalone JSON, no source dependencies
5. **Plugin metadata** (`plugin/.claude-plugin/plugin.json`) — name and description
6. **Documentation** (CLAUDE.md, website, paper) — handled in unit-04 but any `.ai-dlc/` path references in code comments are done here
7. **Root files** (`.gitignore`, README.md) — path references

### Library file rename map (`plugin/lib/*.sh`)

Each library file needs three classes of renames:

#### Function prefix renames (`dlc_` -> `hku_`)

| File | Functions to rename |
|------|-------------------|
| `config.sh` | `get_ai_dlc_config` -> `get_haiku_config`, `export_ai_dlc_config` -> `export_haiku_config` |
| `dag.sh` | (uses `dlc_frontmatter_get` calls — update call sites) |
| `deps.sh` | `dlc_require_jq` -> `hku_require_jq`, `dlc_require_yq` -> `hku_require_yq`, `dlc_check_deps` -> `hku_check_deps`, `dlc_auto_install_deps` -> `hku_auto_install_deps` |
| `design-blueprint.sh` | `dlc_generate_design_blueprint` -> `hku_generate_design_blueprint` |
| `detect-visual-gate.sh` | `dlc_detect_visual_gate` -> `hku_detect_visual_gate` |
| `knowledge.sh` | `dlc_knowledge_dir` -> `hku_knowledge_dir`, `dlc_knowledge_exists` -> `hku_knowledge_exists`, `dlc_knowledge_read` -> `hku_knowledge_read`, `dlc_knowledge_read_section` -> `hku_knowledge_read_section`, `dlc_knowledge_write` -> `hku_knowledge_write`, `dlc_knowledge_update_section` -> `hku_knowledge_update_section`, `dlc_knowledge_list` -> `hku_knowledge_list`, `dlc_knowledge_load_for_hat` -> `hku_knowledge_load_for_hat`, `_dlc_knowledge_validate_type` -> `_hku_knowledge_validate_type`, `_dlc_knowledge_lock` -> `_hku_knowledge_lock`, `_dlc_knowledge_unlock` -> `_hku_knowledge_unlock` |
| `parse.sh` | `dlc_json_get` -> `hku_json_get`, `dlc_json_get_raw` -> `hku_json_get_raw`, `dlc_json_set` -> `hku_json_set`, `dlc_json_validate` -> `hku_json_validate`, `dlc_yaml_get` -> `hku_yaml_get`, `dlc_yaml_get_raw` -> `hku_yaml_get_raw`, `dlc_yaml_set` -> `hku_yaml_set`, `dlc_yaml_to_json` -> `hku_yaml_to_json`, `dlc_frontmatter_get` -> `hku_frontmatter_get`, `dlc_frontmatter_set` -> `hku_frontmatter_set`, `dlc_check_all_criteria` -> `hku_check_all_criteria`, `dlc_check_unit_criteria` -> `hku_check_unit_criteria`, `dlc_check_intent_criteria` -> `hku_check_intent_criteria` |
| `resolve-design-ref.sh` | `dlc_discover_views` -> `hku_discover_views`, `dlc_generate_ref_screenshots` -> `hku_generate_ref_screenshots`, `dlc_resolve_design_ref` -> `hku_resolve_design_ref` |
| `run-visual-comparison.sh` | `dlc_run_visual_comparison` -> `hku_run_visual_comparison` |
| `state.sh` | `dlc_state_save` -> `hku_state_save`, `dlc_state_load` -> `hku_state_load`, `dlc_state_delete` -> `hku_state_delete`, `dlc_state_list` -> `hku_state_list`, `dlc_validate_phase` -> `hku_validate_phase`, `dlc_find_active_intent` -> `hku_find_active_intent` |
| `telemetry.sh` | `aidlc_telemetry_init` -> `haiku_telemetry_init`, `aidlc_log_event` -> `haiku_log_event`, `aidlc_record_intent_created` -> `haiku_record_intent_created`, `aidlc_record_intent_completed` -> `haiku_record_intent_completed`, `aidlc_record_unit_status_change` -> `haiku_record_unit_status_change`, `aidlc_record_hat_transition` -> `haiku_record_hat_transition`, `aidlc_record_bolt_iteration` -> `haiku_record_bolt_iteration`, `aidlc_record_elaboration_complete` -> `haiku_record_elaboration_complete`, `aidlc_record_followup_created` -> `haiku_record_followup_created`, `aidlc_record_cleanup` -> `haiku_record_cleanup`, `aidlc_record_review_decision` -> `haiku_record_review_decision`, `aidlc_record_quality_gate` -> `haiku_record_quality_gate`, `aidlc_record_integration_result` -> `haiku_record_integration_result`, `aidlc_record_delivery_review` -> `haiku_record_delivery_review`, `aidlc_record_delivery_created` -> `haiku_record_delivery_created`, `aidlc_record_hat_failure` -> `haiku_record_hat_failure`, `aidlc_record_worktree_event` -> `haiku_record_worktree_event` |

#### Guard variable renames (`_DLC_` -> `_HKU_`)

| File | Guard variables |
|------|----------------|
| `deps.sh` | `_DLC_DEPS_SOURCED` -> `_HKU_DEPS_SOURCED` |
| `design-blueprint.sh` | `_DLC_DESIGN_BLUEPRINT_SOURCED` -> `_HKU_DESIGN_BLUEPRINT_SOURCED`, `_DLC_ARCHETYPES_JSON` -> `_HKU_ARCHETYPES_JSON` |
| `detect-visual-gate.sh` | `_DLC_DETECT_VISUAL_GATE_SOURCED` -> `_HKU_DETECT_VISUAL_GATE_SOURCED` |
| `hat.sh` | `_DLC_HAT_SOURCED` -> `_HKU_HAT_SOURCED` |
| `knowledge.sh` | `_DLC_KNOWLEDGE_SOURCED` -> `_HKU_KNOWLEDGE_SOURCED`, `_DLC_KNOWLEDGE_SCRIPT_DIR` -> `_HKU_KNOWLEDGE_SCRIPT_DIR`, `_DLC_KNOWLEDGE_TYPES` -> `_HKU_KNOWLEDGE_TYPES` |
| `parse.sh` | `_DLC_PARSE_SOURCED` -> `_HKU_PARSE_SOURCED` |
| `pass.sh` | `_DLC_PASS_SOURCED` -> `_HKU_PASS_SOURCED` |
| `run-visual-comparison.sh` | `_DLC_RUN_VISUAL_COMPARISON_SOURCED` -> `_HKU_RUN_VISUAL_COMPARISON_SOURCED` |
| `resolve-design-ref.sh` | `_DLC_RESOLVE_DESIGN_REF_SOURCED` -> `_HKU_RESOLVE_DESIGN_REF_SOURCED` |
| `state.sh` | `_DLC_STATE_SOURCED` -> `_HKU_STATE_SOURCED` |
| `telemetry.sh` | `_AIDLC_TELEMETRY_SOURCED` -> `_HAIKU_TELEMETRY_SOURCED`, `_AIDLC_TELEMETRY_INIT` -> `_HAIKU_TELEMETRY_INIT`, `_AIDLC_TELEMETRY_ENABLED` -> `_HAIKU_TELEMETRY_ENABLED`, `_AIDLC_TELEMETRY_ENDPOINT` -> `_HAIKU_TELEMETRY_ENDPOINT`, `_AIDLC_TELEMETRY_VERSION` -> `_HAIKU_TELEMETRY_VERSION`, `_AIDLC_TELEMETRY_CURL_HEADERS` -> `_HAIKU_TELEMETRY_CURL_HEADERS` |

#### Environment variable renames (`AI_DLC_` -> `HAIKU_`)

| File | Variables |
|------|-----------|
| `config.sh` | `AI_DLC_DEFAULT_CHANGE_STRATEGY` -> `HAIKU_DEFAULT_CHANGE_STRATEGY`, `AI_DLC_DEFAULT_ELABORATION_REVIEW` -> `HAIKU_DEFAULT_ELABORATION_REVIEW`, `AI_DLC_DEFAULT_BRANCH` -> `HAIKU_DEFAULT_BRANCH`, `AI_DLC_CHANGE_STRATEGY` -> `HAIKU_CHANGE_STRATEGY`, `AI_DLC_ELABORATION_REVIEW` -> `HAIKU_ELABORATION_REVIEW`, `AI_DLC_AUTO_MERGE` -> `HAIKU_AUTO_MERGE`, `AI_DLC_AUTO_SQUASH` -> `HAIKU_AUTO_SQUASH`, `AI_DLC_VCS` -> `HAIKU_VCS` |

#### Telemetry event name renames

All `ai_dlc.*` event names in `telemetry.sh` become `haiku.*`:
- `ai_dlc.intent.created` -> `haiku.intent.created`
- `ai_dlc.intent.completed` -> `haiku.intent.completed`
- `ai_dlc.unit.status_change` -> `haiku.unit.status_change`
- `ai_dlc.hat.transition` -> `haiku.hat.transition`
- `ai_dlc.bolt.iteration` -> `haiku.bolt.iteration`
- `ai_dlc.elaboration.complete` -> `haiku.elaboration.complete`
- `ai_dlc.followup.created` -> `haiku.followup.created`
- `ai_dlc.cleanup.run` -> `haiku.cleanup.run`
- `ai_dlc.review.decision` -> `haiku.review.decision`
- `ai_dlc.quality_gate.result` -> `haiku.quality_gate.result`
- `ai_dlc.integrate.result` -> `haiku.integrate.result`
- `ai_dlc.delivery.review` -> `haiku.delivery.review`
- `ai_dlc.delivery.created` -> `haiku.delivery.created`
- `ai_dlc.hat.failure` -> `haiku.hat.failure`
- `ai_dlc.worktree.event` -> `haiku.worktree.event`

Also update the OTEL service name from `ai-dlc` to `haiku`.

### Path renames (`.ai-dlc/` -> `.haiku/`)

Every code reference to `.ai-dlc/` paths becomes `.haiku/`:

| Pattern | Replacement | Files affected |
|---------|-------------|----------------|
| `.ai-dlc/settings.yml` | `.haiku/settings.yml` | config.sh, elaborate/SKILL.md, setup/SKILL.md, inject-context.sh |
| `.ai-dlc/{slug}/` | `.haiku/{slug}/` | elaborate/SKILL.md, execute/SKILL.md, all hooks, state.sh, dag.sh |
| `.ai-dlc/{slug}/intent.md` | `.haiku/{slug}/intent.md` | elaborate/SKILL.md, execute/SKILL.md, inject-context.sh |
| `.ai-dlc/{slug}/unit-*.md` | `.haiku/{slug}/unit-*.md` | elaborate/SKILL.md, dag.sh, execute/SKILL.md |
| `.ai-dlc/worktrees/` | `.haiku/worktrees/` | execute/SKILL.md, resume/SKILL.md, reset/SKILL.md, inject-context.sh, .gitignore |
| `.ai-dlc/knowledge/` | `.haiku/knowledge/` | knowledge.sh |
| `.ai-dlc/providers/` | `.haiku/providers/` | config.sh, setup/SKILL.md |
| `.ai-dlc/hats/` | `.haiku/hats/` | reflect/SKILL.md |
| `.ai-dlc/ELABORATION.md` | `.haiku/ELABORATION.md` | elaborate/SKILL.md |
| `.ai-dlc/pressure-tests/` | `.haiku/pressure-tests/` | pressure-testing/SKILL.md |
| `.ai-dlc/seeds/` | `.haiku/seeds/` | seed/SKILL.md |

### Branch prefix renames

| Pattern | Replacement | Files affected |
|---------|-------------|----------------|
| `ai-dlc/{intent-slug}/` | `haiku/{intent-slug}/` | inject-context.sh, subagent-context.sh, enforce-iteration.sh, execute/SKILL.md, resume/SKILL.md, followup/SKILL.md, dag.sh |
| Branch pattern in `git branch -a \| grep 'ai-dlc/'` | `git branch -a \| grep 'haiku/'` | followup/SKILL.md, inject-context.sh |
| Worktree branch matching `ai-dlc/*/main` | `haiku/*/main` | dag.sh, inject-context.sh |

### Command renames (`/ai-dlc:*` -> `/haiku:*`)

Every slash command reference across all skills and hooks:

| Old Command | New Command | Context |
|-------------|-------------|---------|
| `/ai-dlc:elaborate` | `/haiku:elaborate` | Skill trigger, cross-references in other skills |
| `/ai-dlc:execute` | `/haiku:execute` | Skill trigger, cross-references |
| `/ai-dlc:autopilot` | `/haiku:autopilot` | Skill trigger (fully autonomous mode — still exists, defers almost all decisions to agent) |
| `/ai-dlc:setup` | `/haiku:setup` | Skill trigger, called from elaborate |
| `/ai-dlc:review` | `/haiku:review` | Skill trigger |
| `/ai-dlc:followup` | `/haiku:followup` | Skill trigger |
| `/ai-dlc:quick` | `/haiku:quick` | Skill trigger |
| `/ai-dlc:adopt` | `/haiku:adopt` | Skill trigger |
| `/ai-dlc:refine` | `/haiku:refine` | Skill trigger |
| `/ai-dlc:release-notes` | `/haiku:release-notes` | Skill trigger |
| `/ai-dlc:compound` | `/haiku:compound` | Skill trigger |
| `/ai-dlc:blockers` | `/haiku:blockers` | Skill trigger |
| `/ai-dlc:backpressure` | `/haiku:backpressure` | Skill trigger |
| `/ai-dlc:fundamentals` | `/haiku:fundamentals` | Skill trigger |
| `/ai-dlc:completion-criteria` | `/haiku:completion-criteria` | Skill trigger |
| `/ai-dlc:construct` | `/haiku:construct` | Deprecated alias |
| `/ai-dlc:operate` | `/haiku:operate` | Skill trigger |
| `/ai-dlc:advance` | `/haiku:advance` | Internal sub-skill reference |
| `/ai-dlc:resume` | `/haiku:resume` | Skill trigger |
| `/ai-dlc:reset` | `/haiku:reset` | Skill trigger |
| `/ai-dlc:cleanup` | `/haiku:cleanup` | Skill trigger |
| `/ai-dlc:seed` | `/haiku:seed` | Skill trigger |
| `/ai-dlc:reflect` | `/haiku:reflect` | Skill trigger |
| `/ai-dlc:dashboard` | `/haiku:dashboard` | Skill trigger |
| `/ai-dlc:ideate` | `/haiku:ideate` | Skill trigger |
| `/ai-dlc:backlog` | `/haiku:backlog` | Skill trigger |
| `/ai-dlc:pressure-testing` | `/haiku:pressure-testing` | Skill trigger |

Also update all `Skill("ai-dlc:*")` invocation strings to `Skill("haiku:*")`.

### Plugin metadata

**`plugin/.claude-plugin/plugin.json`:**
- `"name": "ai-dlc"` -> `"name": "haiku"`
- `"description"` — rewrite to reference H·AI·K·U
- `"homepage": "https://ai-dlc.dev"` -> `"homepage": "https://haiku.dev"` (or correct URL)
- `"repository"` — update if repo is renamed
- `"keywords"` — replace `"ai-dlc"` with `"haiku"`, keep `"haiku-method"`

**`plugin/hooks/hooks.json`:**
- No ai-dlc-specific strings in hooks.json (uses `${CLAUDE_PLUGIN_ROOT}` which is fine)
- Verify: no hook command strings reference `ai-dlc` directly

### Commit message prefixes

All hardcoded commit message strings referencing `ai-dlc:` in skill files:
- `"ai-dlc: initialize default settings"` -> `"haiku: initialize default settings"`
- `"ai-dlc: configure {type} provider"` -> `"haiku: configure {type} provider"`
- `"ai-dlc: reset {type} provider to defaults"` -> `"haiku: reset {type} provider to defaults"`
- `"ai-dlc: remove {type} provider override"` -> `"haiku: remove {type} provider override"`
- `"ai-dlc: configure project settings"` -> `"haiku: configure project settings"`

### Error/log message strings

All stderr messages referencing `ai-dlc:` in library files:
- `"ai-dlc: knowledge: invalid artifact type"` -> `"haiku: knowledge: invalid artifact type"`
- Any other diagnostic strings containing `ai-dlc`

### Shared types

**`plugin/shared/src/types.ts`:**
- Any type names or string literals referencing `ai-dlc` or `AI_DLC`

### Verification commands

After all renames are complete, run these grep patterns to confirm zero remaining references (excluding `.git/`, `node_modules/`, and `CHANGELOG.md` historical entries):

```bash
# Zero results expected for each:
grep -r '\.ai-dlc/' plugin/ --include='*.sh' --include='*.md' --include='*.json' --include='*.ts' --include='*.yml' | grep -v CHANGELOG
grep -r '/ai-dlc:' plugin/ --include='*.sh' --include='*.md' --include='*.json'
grep -r 'dlc_' plugin/lib/ --include='*.sh'
grep -r '_DLC_' plugin/lib/ --include='*.sh'
grep -r 'aidlc_' plugin/ --include='*.sh'
grep -r '_AIDLC_' plugin/ --include='*.sh'
grep -r 'AI_DLC_' plugin/ --include='*.sh' --include='*.json'
grep -r 'ai_dlc\.' plugin/ --include='*.sh'   # telemetry event names
grep -r '"ai-dlc"' plugin/ --include='*.json'
grep -r 'Skill("ai-dlc:' plugin/ --include='*.md'
```

Each of those commands should return 0 results. Any hits indicate missed renames.

### Files NOT renamed (intentional)

- `CHANGELOG.md` — historical entries preserve original terminology (CI-managed, never manually edit)
- `plugin/lib/haiku.sh` — this file already uses `haiku_*` prefixes (H·AI·K·U workspace integration)
- `CLAUDE_PLUGIN_ROOT` environment variable — this is a Claude Code platform convention, not ours

## Success Criteria
- [ ] No remaining `dlc_` function prefixes in `plugin/lib/*.sh` (grep returns 0)
- [ ] No remaining `_DLC_` guard variables in `plugin/lib/*.sh` (grep returns 0)
- [ ] No remaining `aidlc_` / `_AIDLC_` prefixes in `plugin/lib/telemetry.sh` (grep returns 0)
- [ ] No remaining `AI_DLC_` environment variables in `plugin/lib/config.sh` (grep returns 0)
- [ ] No remaining `ai_dlc.*` telemetry event names (grep returns 0)
- [ ] No remaining references to `.ai-dlc/` in any code path (grep returns 0, excluding CHANGELOG.md)
- [ ] No remaining references to `/ai-dlc:` in slash command triggers (grep returns 0)
- [ ] No remaining `Skill("ai-dlc:` invocations (grep returns 0)
- [ ] No remaining `"ai-dlc"` in plugin.json name field
- [ ] Plugin loads and registers correctly under the new name
- [ ] All existing tests pass
- [ ] Settings file at `.haiku/settings.yml` is recognized by config.sh

## Risks
- **Missed references**: Some references may be in generated files, caches, or encoded paths. Mitigation: comprehensive grep sweep using the verification commands above + manual review of each file.
- **Plugin registration**: The claude-plugin system may cache the old name. Mitigation: verify plugin.json updates propagate correctly.
- **Cross-function calls**: Library functions call each other extensively (e.g., `dlc_require_jq` is called from `design-blueprint.sh`). Mitigation: rename in dependency order and verify all call sites update.
- **Telemetry continuity**: Renaming event names means historical telemetry data won't match new events. Mitigation: this is acceptable — the rebrand is a clean break.

## Boundaries
This unit does NOT change architecture, add studios, modify skills logic, or touch the elaborate/execute flow. It is purely a naming exercise. The CHANGELOG.md is CI-managed — do not edit it directly. Historical entries referencing AI-DLC stay as-is.
