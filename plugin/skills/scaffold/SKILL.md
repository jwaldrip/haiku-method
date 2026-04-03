---
description: Scaffold custom H·AI·K·U artifacts — studios, stages, hats, and provider overrides
user-invocable: true
argument-hint: "<type> <name> [parent] [grandparent]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

# H·AI·K·U Scaffold

## Name

`haiku:scaffold` — Generate directory structure and template files for custom H·AI·K·U artifacts.

## Synopsis

```
/haiku:scaffold studio <name>
/haiku:scaffold stage <studio> <stage-name>
/haiku:scaffold hat <studio> <stage> <hat-name>
/haiku:scaffold provider <type>
```

## Description

Creates the correct directory structure and template files for custom artifacts under `.haiku/`. All generated files include the proper frontmatter schema, ready to fill in.

---

## Implementation

### Step 0: Parse Arguments

Parse the first argument as the artifact type. Remaining arguments depend on the type:

| Type | Required Args | Example |
|------|--------------|---------|
| `studio` | `<name>` | `/haiku:scaffold studio data-pipeline` |
| `stage` | `<studio> <stage-name>` | `/haiku:scaffold stage data-pipeline validation` |
| `hat` | `<studio> <stage> <hat-name>` | `/haiku:scaffold hat data-pipeline validation reviewer` |
| `provider` | `<type>` | `/haiku:scaffold provider jira` |

If no arguments are provided, ask the user what they want to create using `AskUserQuestion`:

```json
{
  "questions": [{
    "question": "What would you like to scaffold?",
    "options": ["Studio", "Stage", "Hat", "Provider override"]
  }]
}
```

Then ask follow-up questions for the required names.

### Step 1: Validate

- **Studio name**: kebab-case, no special characters
- **Stage name**: kebab-case, no special characters
- **Hat name**: kebab-case, no special characters
- **Provider type**: must be a known provider type (jira, linear, github-issues, gitlab-issues, notion, confluence, google-docs, figma, slack, teams, discord)

Check if the artifact already exists. If it does, warn the user and ask whether to overwrite.

### Step 2: Scaffold by Type

#### Studio

Create:
```
.haiku/studios/{name}/STUDIO.md
.haiku/studios/{name}/stages/
```

**STUDIO.md template:**
```yaml
---
name: {name}
description: TODO — describe this studio's purpose
stages: []
persistence:
  type: git
  delivery: pull-request
---

# {Name} Studio

Describe the lifecycle this studio supports and when to use it.

## Stage Pipeline

Add stages to the `stages` list above, then scaffold each one:

```
/haiku:scaffold stage {name} <stage-name>
```
```

#### Stage

Verify the parent studio exists at `.haiku/studios/{studio}/STUDIO.md` or `plugin/studios/{studio}/STUDIO.md`. If neither exists, error.

Create:
```
.haiku/studios/{studio}/stages/{stage}/STAGE.md
.haiku/studios/{studio}/stages/{stage}/hats/
```

**STAGE.md template:**
```yaml
---
name: {stage}
description: TODO — describe what this stage accomplishes
hats: []
review: ask
unit_types: []
inputs: []
---

## Completion Signal

TODO — describe the conditions under which this stage is done.
```

Remind the user to:
1. Add hat files in the `hats/` directory
2. Add this stage name to the parent studio's `stages` list

#### Hat

Verify the parent stage exists at `.haiku/studios/{studio}/stages/{stage}/STAGE.md` or `plugin/studios/{studio}/stages/{stage}/STAGE.md`. If neither exists, error.

Create:
```
.haiku/studios/{studio}/stages/{stage}/hats/{hat}.md
```

**Hat template:**
```markdown
**Focus:** TODO — describe this hat's core responsibility and what it concentrates on.

**Produces:** TODO — describe artifacts or outputs this hat creates.

**Reads:** TODO — describe inputs this hat consumes.

**Anti-patterns:**
- TODO — common mistakes to avoid
```

Remind the user to add this hat name to the parent stage's `hats` list.

#### Provider Override

Read the built-in provider instructions from `${CLAUDE_PLUGIN_ROOT}/providers/{category}.md` where `{category}` is resolved from the provider type:

| Type | Category |
|------|----------|
| jira, linear, github-issues, gitlab-issues | ticketing |
| notion, confluence, google-docs | spec |
| figma, canva, penpot, excalidraw | design |
| slack, teams, discord | comms |

Create:
```
.haiku/providers/{type}.md
```

Pre-populate with the built-in defaults as a starting template:
```markdown
---
category: {category}
description: Project-specific {type} instructions
---

{body of built-in default}
```

### Step 3: Summary

Display what was created:

```
Created {type}: .haiku/studios/{path}/

Files:
  - .haiku/studios/{path}/STUDIO.md
  - .haiku/studios/{path}/stages/ (empty, ready for stages)

Next steps:
  - Edit the STUDIO.md to fill in description and stages
  - Run /haiku:scaffold stage {name} <stage-name> to add stages
```

Adjust the summary for each artifact type.

---

## Error Handling

| Scenario | Behavior |
|---|---|
| No arguments, no interactive input | Show usage help |
| Artifact already exists | Warn, ask to overwrite or skip |
| Parent doesn't exist (stage without studio, hat without stage) | Error with suggestion to scaffold the parent first |
| Invalid name (spaces, special chars) | Error with naming rules |
