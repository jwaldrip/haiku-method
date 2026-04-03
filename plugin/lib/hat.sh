#!/bin/bash
# hat.sh — Hat resolution and metadata for H·AI·K·U
#
# Hats define roles (builder, reviewer, planner, etc.).
# Definitions live inline in stage STAGE.md files as ## {hat-name} sections.
# Project-level overrides can be placed in .haiku/hats/*.md for augmentation.
#
# Usage:
#   source hat.sh
#   instructions=$(hku_resolve_hat_instructions "builder" "development" "software")
#   hat_sequence=$(hku_get_hat_sequence "development" "software")

# Guard against double-sourcing
if [ -n "${_HKU_HAT_SOURCED:-}" ]; then
  return 0 2>/dev/null || exit 0
fi
_HKU_HAT_SOURCED=1

# Source configuration system (chains to deps.sh, parse.sh, state.sh)
HAT_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
# shellcheck source=config.sh
source "$HAT_SCRIPT_DIR/config.sh"
# shellcheck source=stage.sh
source "$HAT_SCRIPT_DIR/stage.sh"

# Extract a hat section from a STAGE.md file
# Reads from ## {hat-name} to the next ## heading or EOF
# Usage: hku_extract_hat_section <stage_file> <hat_name>
hku_extract_hat_section() {
  local stage_file="$1"
  local hat_name="$2"
  awk -v hat="## ${hat_name}" '
    BEGIN { found=0 }
    $0 == hat || $0 ~ "^"hat"[[:space:]]" { found=1; next }
    found && /^## / { exit }
    found { print }
  ' "$stage_file"
}

# Get the hat sequence for a stage (replaces workflow lookup)
# Usage: hku_get_hat_sequence <stage_name> <studio_name>
# Returns: space-separated hat names in order
hku_get_hat_sequence() {
  local stage_name="$1"
  local studio_name="$2"
  local stage_file
  stage_file=$(hku_resolve_stage "$stage_name" "$studio_name") || return 1
  yq --front-matter=extract '.hats[]' "$stage_file" 2>/dev/null | tr '\n' ' ' | sed 's/ $//'
}

# Resolve hat instructions from stage-based definition with augmentation
# Resolution order:
#   1. Project-level stage override: .haiku/studios/{studio}/stages/{stage}/STAGE.md
#   2. Built-in stage: plugin/studios/{studio}/stages/{stage}/STAGE.md
#   3. Fallback (no stage configured): ideation studio's research stage
#   4. Project-level hat override: .haiku/hats/{hat}.md (augments, doesn't replace)
#
# Usage: hku_resolve_hat_instructions <hat_name> [stage_name] [studio_name]
# Returns: instruction text (empty string if not found)
hku_resolve_hat_instructions() {
  local hat_name="$1"
  local stage_name="${2:-}"
  local studio_name="${3:-}"

  # Validate hat name is a simple identifier (no path traversal)
  if [[ ! "$hat_name" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    return 1
  fi

  # Default fallback: development stage in software studio
  [ -z "$stage_name" ] && stage_name="development"
  [ -z "$studio_name" ] && studio_name="software"

  local stage_file
  stage_file=$(hku_resolve_stage "$stage_name" "$studio_name" 2>/dev/null) || {
    # Fallback to ideation/research if stage not found
    stage_file=$(hku_resolve_stage "research" "ideation" 2>/dev/null) || true
  }

  local merged=""

  # Extract hat section from stage file
  if [[ -n "$stage_file" && -f "$stage_file" ]]; then
    merged=$(hku_extract_hat_section "$stage_file" "$hat_name")
  fi

  # Check for project-level hat augmentation
  local repo_root
  repo_root=$(find_repo_root 2>/dev/null || echo "")
  if [[ -n "$repo_root" ]]; then
    local project_file="${repo_root}/.haiku/hats/${hat_name}.md"
    if [[ -f "$project_file" ]]; then
      local project_body
      project_body=$(awk '/^---$/{n++; next} n>=2' "$project_file")
      if [[ -n "$merged" ]]; then
        merged="${merged}

## Project Augmentation
${project_body}"
      else
        # No stage section found, use project hat as primary
        merged="$project_body"
      fi
    fi
  fi

  printf '%s' "$merged"
}

# Backward-compat wrapper: resolves hat instructions with empty stage/studio (triggers defaults)
# Usage: load_hat_instructions <hat_name>
load_hat_instructions() {
  hku_resolve_hat_instructions "$1"
}

# Load hat metadata (name, description) from the stage definition
# Name = the hat_name itself
# Description = first **Focus:** line in the hat section
# Falls back to project .haiku/hats/{hat}.md if it exists
# Usage: load_hat_metadata <hat_name> [stage_name] [studio_name]
# Returns: JSON with name, description
load_hat_metadata() {
  local hat_name="$1"
  local stage_name="${2:-}"
  local studio_name="${3:-}"

  # Validate hat name is a simple identifier (no path traversal)
  if [[ ! "$hat_name" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    echo "{}"
    return 1
  fi

  # Default fallback
  [ -z "$stage_name" ] && stage_name="development"
  [ -z "$studio_name" ] && studio_name="software"

  local description=""
  local stage_file
  stage_file=$(hku_resolve_stage "$stage_name" "$studio_name" 2>/dev/null) || true

  if [[ -n "$stage_file" && -f "$stage_file" ]]; then
    # Extract first **Focus:** line from the hat section
    local section
    section=$(hku_extract_hat_section "$stage_file" "$hat_name")
    if [[ -n "$section" ]]; then
      description=$(echo "$section" | grep -m1 '^\*\*Focus:\*\*' | sed 's/^\*\*Focus:\*\* *//')
    fi
  fi

  # Fallback to project hat file
  if [[ -z "$description" ]]; then
    local repo_root
    repo_root=$(find_repo_root 2>/dev/null || echo "")
    if [[ -n "$repo_root" ]]; then
      local project_file="${repo_root}/.haiku/hats/${hat_name}.md"
      if [[ -f "$project_file" ]]; then
        local name_fm desc_fm
        name_fm=$(hku_frontmatter_get "name" "$project_file" 2>/dev/null)
        desc_fm=$(hku_frontmatter_get "description" "$project_file" 2>/dev/null)
        [[ -n "$name_fm" ]] && hat_name="$name_fm"
        [[ -n "$desc_fm" ]] && description="$desc_fm"
      fi
    fi
  fi

  # JSON-escape string values
  hat_name="${hat_name//\"/\\\"}"
  description="${description//\"/\\\"}"

  printf '{"name":"%s","description":"%s"}' "$hat_name" "$description"
}
