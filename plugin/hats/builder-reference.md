# Builder Reference

Companion to the Builder hat. Loaded on-demand when the builder needs to check discipline rules.

## Anti-Rationalization

| Excuse                           | Reality                                                 |
| -------------------------------- | ------------------------------------------------------- |
| "I'll add tests later"           | Tests first or not at all. "Later" never comes.         |
| "It's just a small change"       | Small changes break production. Test everything.        |
| "The existing tests cover this"  | Verify - don't assume. Run them.                        |
| "TDD will slow us down"          | TDD is faster than debugging blind.                     |
| "This lint rule is wrong"        | The lint rule is the spec. Fix your code, not the rule. |
| "I'll commit when it's all done" | Commit working increments. Batching loses progress.     |
| "I can skip the type check"      | The type system is your co-reviewer. Listen to it.      |

## Red Flags

- Writing code before tests
- Disabling or bypassing quality checks
- Working 10+ minutes without committing
- Ignoring backpressure failures

**All of these mean: STOP, revert to last green state, and re-approach.**

## Deviation Rules

When encountering unexpected situations during building, follow these rules:

### Auto-Fix (No User Permission Needed)

| Rule                             | Triggers                                                                                                | Tracking                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Rule 1: Fix Bugs**             | Broken behavior, runtime errors, type errors, security vulnerabilities, race conditions, memory leaks   | `[Rule 1 - Bug] description`              |
| **Rule 2: Add Missing Critical** | Error handling, input validation, null checks, auth on protected routes, CSRF/CORS, rate limiting       | `[Rule 2 - Missing Critical] description` |
| **Rule 3: Fix Blockers**         | Missing dependencies, wrong types, broken imports, missing env vars, build config errors, circular deps | `[Rule 3 - Blocking] description`         |

### Pause for Humans (MUST STOP)

| Triggers                                  | Action                                         |
| ----------------------------------------- | ---------------------------------------------- |
| New database table or major schema change | STOP — present change details and alternatives |
| Switching libraries or frameworks         | STOP — present rationale and alternatives      |
| Changing authentication approach          | STOP — present security implications           |
| Breaking API changes                      | STOP — present migration path                  |
| New infrastructure requirements           | STOP — present scope and cost                  |

**Decision heuristic:** "Does this affect correctness, security, or ability to complete the task?" Yes = Auto-fix (Rules 1-3). Maybe = Pause for humans (Rule 4).

**Scope boundary:** Only auto-fix issues directly caused by current task's changes. Pre-existing warnings in unrelated files should be noted in scratchpad, not fixed during this bolt.

### Node Repair Operator

When a task fails during building, follow this graduated recovery pattern:

```
RETRY → DECOMPOSE → PRUNE → ESCALATE
```

**1. RETRY** (default: 2 attempts per task)
- Same approach with a specific adjustment
- Use for: transient errors, missing deps, command failures
- You MUST change something between retries — never retry the exact same action

**2. DECOMPOSE** (after retry budget exhausted)
- Break the failing task into 2-3 smaller sub-tasks
- Execute each sub-task sequentially
- Use for: task too broad, unclear failure point, partial progress possible
- You MUST create concrete sub-tasks, not vague "try again" steps

**3. PRUNE** (when task is infeasible)
- Skip the task with documented justification
- Use for: missing prerequisites, out of scope, contradicts earlier decisions
- You MUST document what was skipped and why in scratchpad
- You MUST NOT prune tasks that are core to completion criteria

**4. ESCALATE** (when repair budget exhausted or architectural decision needed)
- Stop and surface to the user with:
  - Summary of what was tried (retries + decomposition attempts)
  - Specific blocker description
  - Available options for the user to choose from
- Use for: architectural decisions, ambiguous requirements, external blockers
- Save blocker to `han keep save blockers.md`

**Analysis paralysis guard:** If 5+ consecutive Read/Grep/Glob calls without any Edit/Write/Bash action, you MUST either write code or declare "blocked" with specific missing information.

All deviations MUST be documented in scratchpad:

```markdown
## Deviations from Plan

### Auto-fixed Issues
**1. [Rule 1 - Bug] Fixed null reference in user lookup**
- **Found during:** Task 3
- **Issue:** user.profile was undefined when profile not loaded
- **Fix:** Added null check with early return
- **Files modified:** src/services/user.ts
```
