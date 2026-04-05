#!/bin/bash
# prompt-guard.sh — Advisory scan for prompt injection in spec files
set -euo pipefail

# Source foundation libraries
PLUGIN_ROOT="${CLAUDE_PLUGIN_ROOT:-$(dirname "$(dirname "$(readlink -f "$0")")")}"
HAIKU_PARSE="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/..}/bin/haiku-parse.mjs"
hku_check_deps || exit 0

INPUT=$(cat)
TOOL=$(echo "$INPUT" | "$HAIKU_PARSE" get --stdin "tool_name")
[[ "$TOOL" =~ ^(Write|Edit)$ ]] || exit 0
FILE=$(echo "$INPUT" | "$HAIKU_PARSE" get --stdin "tool_input.file_path")
[[ "$FILE" =~ /\.haiku/ ]] || exit 0
CONTENT=$(echo "$INPUT" | "$HAIKU_PARSE" get --stdin "tool_input.content")
[ -z "$CONTENT" ] && CONTENT=$(echo "$INPUT" | "$HAIKU_PARSE" get --stdin "tool_input.new_string")
# Check for injection patterns
if echo "$CONTENT" | grep -qiE '(ignore previous|disregard|override instructions|you are now|system prompt|<system>|</system>)'; then
  echo "⚠️ PROMPT GUARD: Potential injection pattern detected in spec file write to $FILE"
  echo "Review the content before proceeding."
fi
