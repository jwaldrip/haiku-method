#!/bin/bash
# parse.sh — JSON, YAML, and frontmatter parsing for H·AI·K·U
#
# Uses the bundled haiku-parse.mjs (Node.js, zero deps).
# Falls back to jq/yq if available for stdin-based JSON operations.
#
# Usage:
#   source parse.sh
#   hku_frontmatter_get status intent.md
#   hku_frontmatter_set status active intent.md

# Guard against double-sourcing
if [ -n "${_HKU_PARSE_SOURCED:-}" ]; then
  return 0 2>/dev/null || exit 0
fi
_HKU_PARSE_SOURCED=1

# Source dependency checker
PARSE_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
# shellcheck source=deps.sh
source "$PARSE_SCRIPT_DIR/deps.sh"

# Resolve haiku-parse binary
_HAIKU_PARSE="${CLAUDE_PLUGIN_ROOT:-$PARSE_SCRIPT_DIR/..}/bin/haiku-parse.mjs"

# ============================================================================
# JSON Functions (stdin-based — used for piped JSON manipulation)
# ============================================================================

# Extract a field from JSON on stdin, with optional default
# Usage: echo '{"key":"val"}' | hku_json_get "key" ["default"]
hku_json_get() {
  local field="$1"
  local default="${2:-}"
  local input
  input=$(cat)
  local tmp
  tmp=$(mktemp)
  printf '%s' "$input" > "$tmp"
  local result
  result=$("$_HAIKU_PARSE" get "$tmp" "$field" 2>/dev/null)
  rm -f "$tmp"
  if [ -z "$result" ] && [ -n "$default" ]; then
    echo "$default"
  else
    echo "$result"
  fi
}

# Extract a field from JSON on stdin as raw JSON (arrays/objects preserved)
# Usage: echo '{"arr":[1,2]}' | hku_json_get_raw "arr"
hku_json_get_raw() {
  local field="$1"
  local input
  input=$(cat)
  local tmp
  tmp=$(mktemp)
  printf '%s' "$input" > "$tmp"
  "$_HAIKU_PARSE" get "$tmp" "$field" 2>/dev/null
  rm -f "$tmp"
}

# Set a field in JSON on stdin, output modified JSON to stdout
# Usage: echo '{}' | hku_json_set "key" "value"
hku_json_set() {
  local field="$1"
  local value="$2"
  local input
  input=$(cat)
  local tmp
  tmp=$(mktemp)
  printf '%s' "$input" > "$tmp"
  "$_HAIKU_PARSE" set "$tmp" "$field" "$value" 2>/dev/null
  cat "$tmp"
  rm -f "$tmp"
}

# Validate JSON on stdin
# Returns 0 if valid, 1 if invalid.
hku_json_validate() {
  local tmp
  tmp=$(mktemp)
  cat > "$tmp"
  node -e "JSON.parse(require('fs').readFileSync('$tmp','utf8'))" 2>/dev/null
  local rc=$?
  rm -f "$tmp"
  return $rc
}

# ============================================================================
# File-based Functions (direct file access — preferred)
# ============================================================================

# Extract a field from a markdown frontmatter file
# Usage: hku_frontmatter_get "status" "intent.md"
hku_frontmatter_get() {
  local field="$1"
  local file="$2"

  if [ ! -f "$file" ]; then
    echo ""
    return 0
  fi

  "$_HAIKU_PARSE" get "$file" "$field" 2>/dev/null || echo ""
}

# Update a field in markdown frontmatter in-place
# Usage: hku_frontmatter_set "status" "active" "intent.md"
hku_frontmatter_set() {
  local field="$1"
  local value="$2"
  local file="$3"

  if [ ! -f "$file" ]; then
    echo "haiku: hku_frontmatter_set: file not found: $file" >&2
    return 1
  fi

  "$_HAIKU_PARSE" set "$file" "$field" "$value"
}

# Dump all frontmatter/JSON/YAML fields as JSON
# Usage: hku_dump "intent.md"
hku_dump() {
  local file="$1"
  "$_HAIKU_PARSE" dump "$file" 2>/dev/null || echo "{}"
}

# ============================================================================
# Stage State Functions (state.json files)
# ============================================================================

# Read a stage state field
# Usage: hku_stage_state_get "phase" "$intent_dir" "$stage_name"
hku_stage_state_get() {
  local field="$1"
  local intent_dir="$2"
  local stage_name="$3"
  local state_file="${intent_dir}/stages/${stage_name}/state.json"

  if [ ! -f "$state_file" ]; then
    echo ""
    return 0
  fi

  "$_HAIKU_PARSE" get "$state_file" "$field" 2>/dev/null || echo ""
}

# Write a stage state field
# Usage: hku_stage_state_set "phase" "execute" "$intent_dir" "$stage_name"
hku_stage_state_set() {
  local field="$1"
  local value="$2"
  local intent_dir="$3"
  local stage_name="$4"
  local state_file="${intent_dir}/stages/${stage_name}/state.json"

  # Create state file if it doesn't exist
  if [ ! -f "$state_file" ]; then
    mkdir -p "$(dirname "$state_file")"
    echo '{}' > "$state_file"
  fi

  "$_HAIKU_PARSE" set "$state_file" "$field" "$value"
}

# ============================================================================
# Markdown Checkbox Functions (completion criteria helpers)
# ============================================================================

# Check off all markdown checkboxes in a file (or within a specific section)
# Usage: hku_check_all_criteria <file> [section_heading]
hku_check_all_criteria() {
  local file="$1"
  local section="${2:-}"

  [ -f "$file" ] || return 1

  if [ -z "$section" ]; then
    local tmp="${file}.tmp.$$"
    sed 's/- \[ \]/- [x]/g' "$file" > "$tmp" && mv "$tmp" "$file"
  else
    local tmp="${file}.tmp.$$"
    awk -v section="$section" '
      BEGIN { in_section = 0 }
      /^## / {
        if (index($0, section) > 0) {
          in_section = 1
        } else if (in_section) {
          in_section = 0
        }
      }
      in_section && /- \[ \]/ {
        gsub(/- \[ \]/, "- [x]")
      }
      { print }
    ' "$file" > "$tmp" && mv "$tmp" "$file"
  fi
}

# Check off all completion criteria checkboxes in a unit file
# Usage: hku_check_unit_criteria <unit_file>
hku_check_unit_criteria() {
  local unit_file="$1"
  [ -f "$unit_file" ] || return 1

  if grep -q '^## Success Criteria' "$unit_file"; then
    hku_check_all_criteria "$unit_file" "Success Criteria"
  elif grep -q '^## Completion Criteria' "$unit_file"; then
    hku_check_all_criteria "$unit_file" "Completion Criteria"
  fi
}

# Check off all completion criteria in intent-level files
# Usage: hku_check_intent_criteria <intent_dir>
hku_check_intent_criteria() {
  local intent_dir="$1"

  if [ -f "$intent_dir/intent.md" ]; then
    if grep -q '^## Success Criteria' "$intent_dir/intent.md"; then
      hku_check_all_criteria "$intent_dir/intent.md" "Success Criteria"
    elif grep -q '^## Completion Criteria' "$intent_dir/intent.md"; then
      hku_check_all_criteria "$intent_dir/intent.md" "Completion Criteria"
    fi
  fi

  for criteria_file in "$intent_dir/completion-criteria.md" "$intent_dir/state/completion-criteria.md"; do
    [ -f "$criteria_file" ] && hku_check_all_criteria "$criteria_file"
  done
}
