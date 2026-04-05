#!/bin/bash
# state.sh — State management for H·AI·K·U
#
# Primary state lives in artifact frontmatter (intent.md, unit-*.md)
# and stage state files (stages/{stage}/state.json).
#
# This module provides convenience functions for reading/writing state
# and for legacy compatibility with the old state/ directory approach.
#
# Usage:
#   source state.sh
#   hku_intent_set_status "$intent_dir" "active"
#   status=$(hku_intent_get_status "$intent_dir")

# Guard against double-sourcing
if [ -n "${_HKU_STATE_SOURCED:-}" ]; then
  return 0 2>/dev/null || exit 0
fi
_HKU_STATE_SOURCED=1

# Source parse library
STATE_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
# shellcheck source=parse.sh
source "$STATE_SCRIPT_DIR/parse.sh"

# ============================================================================
# Intent State (stored in intent.md frontmatter)
# ============================================================================

hku_intent_get_status() {
  hku_frontmatter_get "status" "$1/intent.md"
}

hku_intent_set_status() {
  local intent_dir="$1" status="$2"
  hku_frontmatter_set "status" "$status" "$intent_dir/intent.md"
}

hku_intent_set_started() {
  local intent_dir="$1"
  local ts
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  hku_frontmatter_set "started_at" "$ts" "$intent_dir/intent.md"
}

hku_intent_set_completed() {
  local intent_dir="$1"
  local ts
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  hku_frontmatter_set "completed_at" "$ts" "$intent_dir/intent.md"
  hku_frontmatter_set "status" "completed" "$intent_dir/intent.md"
}

# ============================================================================
# Stage State (stored in stages/{stage}/state.json)
# ============================================================================

hku_stage_get_phase() {
  hku_stage_state_get "phase" "$1" "$2"
}

hku_stage_set_phase() {
  local intent_dir="$1" stage="$2" phase="$3"
  hku_stage_state_set "phase" "$phase" "$intent_dir" "$stage"
}

hku_stage_set_started() {
  local intent_dir="$1" stage="$2"
  local ts
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  hku_stage_state_set "status" "active" "$intent_dir" "$stage"
  hku_stage_state_set "started_at" "$ts" "$intent_dir" "$stage"
  hku_stage_state_set "phase" "decompose" "$intent_dir" "$stage"
}

hku_stage_set_completed() {
  local intent_dir="$1" stage="$2" gate_outcome="${3:-advanced}"
  local ts
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  hku_stage_state_set "status" "completed" "$intent_dir" "$stage"
  hku_stage_state_set "completed_at" "$ts" "$intent_dir" "$stage"
  hku_stage_state_set "gate_outcome" "$gate_outcome" "$intent_dir" "$stage"
}

hku_stage_set_gate_entered() {
  local intent_dir="$1" stage="$2"
  local ts
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  hku_stage_state_set "phase" "gate" "$intent_dir" "$stage"
  hku_stage_state_set "gate_entered_at" "$ts" "$intent_dir" "$stage"
}

# ============================================================================
# Unit State (stored in unit-*.md frontmatter)
# ============================================================================

hku_unit_start() {
  local unit_file="$1"
  local ts
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  hku_frontmatter_set "status" "active" "$unit_file"
  hku_frontmatter_set "started_at" "$ts" "$unit_file"
  hku_frontmatter_set "bolt" "1" "$unit_file"
}

hku_unit_complete() {
  local unit_file="$1"
  local ts
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  hku_frontmatter_set "status" "completed" "$unit_file"
  hku_frontmatter_set "completed_at" "$ts" "$unit_file"
}

hku_unit_increment_bolt() {
  local unit_file="$1"
  local current
  current=$(hku_frontmatter_get "bolt" "$unit_file")
  current=${current:-0}
  hku_frontmatter_set "bolt" "$(( current + 1 ))" "$unit_file"
}

hku_unit_set_hat() {
  local unit_file="$1" hat="$2"
  hku_frontmatter_set "hat" "$hat" "$unit_file"
}

# ============================================================================
# Legacy Compatibility (state/ directory — deprecated)
# ============================================================================

# These functions maintain backward compatibility with the old state/ approach.
# New code should use the frontmatter/state.json functions above.

# Save to state/ directory (legacy)
# Usage: hku_state_save <intent_dir> <key> <content>
hku_state_save() {
  local intent_dir="$1"
  local key="$2"
  local content="$3"
  local state_dir="${intent_dir}/state"
  local filepath="${state_dir}/${key}"

  mkdir -p "$state_dir" 2>/dev/null || return 1

  local tmp="${filepath}.tmp.$$"
  printf '%s' "$content" > "$tmp" && mv "$tmp" "$filepath"
}

# Load from state/ directory (legacy)
# Usage: hku_state_load <intent_dir> <key>
hku_state_load() {
  local intent_dir="$1"
  local key="$2"
  cat "${intent_dir}/state/${key}" 2>/dev/null || echo ""
}

# Delete from state/ directory (legacy)
hku_state_delete() {
  local intent_dir="$1"
  local key="$2"
  rm -f "${intent_dir}/state/${key}"
}

# List state keys (legacy)
hku_state_list() {
  local intent_dir="$1"
  local state_dir="${intent_dir}/state"
  [ -d "$state_dir" ] && ls "$state_dir" 2>/dev/null || true
}
