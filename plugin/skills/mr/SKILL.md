---
description: Create a merge/pull request for the current intent
---

## Name

`ai-dlc:mr` - Create a merge/pull request for the current intent's work.

## Synopsis

```
/mr
```

## Description

**User-facing command** - Creates a PR (GitHub) or MR (GitLab) for the current intent branch. Designed for simplicity so that non-technical users (e.g., designers using AI-DLC) can share their work with a single command.

**User Flow:**
```
User: /mr
AI: Pushing branch, creating PR...
AI: PR created: https://github.com/org/repo/pull/42
```

## Implementation

### Step 1: Load Intent State

```bash
INTENT_SLUG=$(han keep load intent-slug --quiet 2>/dev/null || echo "")
```

If no active intent is found, stop with an error:

```
## No Active Intent

No active AI-DLC intent found in this session.

**To resume an existing intent:**
  /resume [intent-slug]

**To start a new intent:**
  /elaborate
```

### Step 2: Determine What to Push

Read the current branch and push it to origin if not already pushed.

```bash
CURRENT_BRANCH=$(git branch --show-current)

# Push to origin if not already tracking
if ! git rev-parse --abbrev-ref "${CURRENT_BRANCH}@{upstream}" &>/dev/null; then
  git push -u origin "$CURRENT_BRANCH"
else
  # Ensure remote is up to date
  git push
fi
```

### Step 3: Determine Target Branch

Load the default branch from AI-DLC config:

```bash
source "${CLAUDE_PLUGIN_ROOT}/lib/config.sh"
INTENT_DIR=".ai-dlc/${INTENT_SLUG}"
CONFIG=$(get_ai_dlc_config "$INTENT_DIR")
DEFAULT_BRANCH=$(echo "$CONFIG" | jq -r '.default_branch')
```

Ask the user to confirm or override the target branch using `AskUserQuestion`:

```json
{
  "questions": [{
    "question": "Which branch should this PR/MR target?",
    "header": "Target Branch",
    "options": [
      {"label": "${DEFAULT_BRANCH}", "description": "Default branch from AI-DLC config"},
      {"label": "Other", "description": "Specify a different target branch"}
    ],
    "multiSelect": false
  }]
}
```

If the user selects "Other", prompt them for the branch name.

```bash
TARGET_BRANCH="$DEFAULT_BRANCH"  # or user-specified override
```

### Step 4: Gather Context

Read `intent.md` for title, problem, and solution. Read all unit files for completion status.

```bash
INTENT_DIR=".ai-dlc/${INTENT_SLUG}"
INTENT_FILE="${INTENT_DIR}/intent.md"

# Extract intent metadata
INTENT_TITLE=$(han parse yaml title -r --default "$INTENT_SLUG" < "$INTENT_FILE" 2>/dev/null || echo "$INTENT_SLUG")
PROBLEM_SECTION=$(han parse yaml problem -r --default "" < "$INTENT_FILE" 2>/dev/null || echo "")
SOLUTION_SECTION=$(han parse yaml solution -r --default "" < "$INTENT_FILE" 2>/dev/null || echo "")

# Build unit status list and collect ticket references
UNIT_LIST=""
TICKET_REFS=""
for unit_file in "$INTENT_DIR"/unit-*.md; do
  [ -f "$unit_file" ] || continue
  UNIT_NAME=$(basename "$unit_file" .md)
  UNIT_STATUS=$(han parse yaml status -r --default "unknown" < "$unit_file" 2>/dev/null || echo "unknown")
  UNIT_TITLE=$(han parse yaml title -r --default "$UNIT_NAME" < "$unit_file" 2>/dev/null || echo "$UNIT_NAME")
  UNIT_LIST="${UNIT_LIST}\n- **${UNIT_TITLE}** (${UNIT_NAME}): ${UNIT_STATUS}"

  TICKET=$(han parse yaml ticket -r --default "" < "$unit_file" 2>/dev/null || echo "")
  [ -n "$TICKET" ] && TICKET_REFS="${TICKET_REFS}\nCloses ${TICKET}"
done
```

### Step 5: Create the PR/MR

Detect the platform and create the PR or MR accordingly.

```bash
# Detect platform
if gh auth status &>/dev/null; then
  PLATFORM="github"
elif glab auth status &>/dev/null; then
  PLATFORM="gitlab"
else
  echo "Error: No GitHub or GitLab CLI authenticated."
  echo ""
  echo "Install and authenticate one of:"
  echo "  - GitHub CLI: https://cli.github.com/"
  echo "  - GitLab CLI: https://gitlab.com/gitlab-org/cli"
  exit 1
fi

if [ "$PLATFORM" = "github" ]; then
  PR_URL=$(gh pr create \
    --base "$TARGET_BRANCH" \
    --head "$CURRENT_BRANCH" \
    --title "$INTENT_TITLE" \
    --body "$(cat <<EOF
## Summary

**Problem:** ${PROBLEM_SECTION}

**Solution:** ${SOLUTION_SECTION}

## Units
$(printf "%b" "${UNIT_LIST}")

$(printf "%b" "${TICKET_REFS}")

---
*Built with [AI-DLC](https://ai-dlc.dev)*
EOF
)")
elif [ "$PLATFORM" = "gitlab" ]; then
  MR_URL=$(glab mr create \
    --target-branch "$TARGET_BRANCH" \
    --source-branch "$CURRENT_BRANCH" \
    --title "$INTENT_TITLE" \
    --description "$(cat <<EOF
## Summary

**Problem:** ${PROBLEM_SECTION}

**Solution:** ${SOLUTION_SECTION}

## Units
$(printf "%b" "${UNIT_LIST}")

$(printf "%b" "${TICKET_REFS}")

---
*Built with [AI-DLC](https://ai-dlc.dev)*
EOF
)")
fi
```

### Step 6: Report

Output the PR/MR URL to the user:

```markdown
## PR/MR Created

**URL:** ${PR_URL or MR_URL}
**Target:** ${TARGET_BRANCH}
**Source:** ${CURRENT_BRANCH}
**Intent:** ${INTENT_TITLE}

The PR/MR is ready for review.
```

## Examples

### Basic Usage

```
User: /mr
AI: Loading intent state...
    Intent: design-system-tokens
    Branch: ai-dlc/design-system-tokens/main

    Which branch should this PR/MR target?
    > main (Default branch from AI-DLC config)
    > Other (Specify a different target branch)

User: main
AI: ## PR/MR Created

    **URL:** https://github.com/org/repo/pull/42
    **Target:** main
    **Source:** ai-dlc/design-system-tokens/main
    **Intent:** Design System Tokens

    The PR/MR is ready for review.
```

### No Active Intent

```
User: /mr
AI: ## No Active Intent

    No active AI-DLC intent found in this session.

    **To resume an existing intent:**
      /resume [intent-slug]

    **To start a new intent:**
      /elaborate
```
