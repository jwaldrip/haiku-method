---
description: Structured problem analysis — Five Whys, root-cause tracing, and fishbone analysis for debugging
disable-model-invocation: true
user-invocable: true
argument-hint: "[method] [problem-description]"
---

## Name

`ai-dlc:kaizen` - Structured problem analysis for debugging and root-cause investigation.

## Synopsis

```
/kaizen [method] [problem-description]
```

## Description

**User-facing command** - Apply structured problem analysis techniques to diagnose bugs, recurring failures, and complex multi-factor issues.

Available methods:
- `why` - Five Whys iterative root-cause analysis
- `trace` - Root-cause tracing backward through the call stack
- `fishbone` - Fishbone (Ishikawa) analysis for complex multi-factor problems
- *(no method)* - Auto-select the best method based on the problem description

## Implementation

### Step 0: Parse Arguments

```
ARG1 = first argument
ARG2..N = remaining arguments joined as problem description

If ARG1 is "why", "trace", or "fishbone":
  METHOD = ARG1
  PROBLEM = ARG2..N
Else:
  METHOD = "auto"
  PROBLEM = all arguments joined
```

If no problem description is provided:

```
No problem description provided.

Usage:
  /kaizen [method] <problem-description>

Methods:
  why       - Five Whys iterative root-cause analysis
  trace     - Root-cause tracing for bugs (backward through call stack)
  fishbone  - Fishbone analysis for complex multi-factor problems
  (omit)    - Auto-select best method

Example:
  /kaizen why Tests pass locally but fail in CI
  /kaizen trace TypeError: Cannot read property 'id' of undefined
  /kaizen fishbone Deployment succeeds but app returns 502 intermittently
  /kaizen Users report slow page loads after last release
```

### Step 1: Auto-Select Method (if METHOD = "auto")

Analyze the problem description and select the best method:

| Signal | Method | Rationale |
|--------|--------|-----------|
| Error message, stack trace, crash, specific bug | `trace` | Single clear bug with observable symptom |
| "keeps happening", "again", "recurring", "every time", "still broken" | `why` | Recurring problem suggests deeper systemic cause |
| Multiple symptoms, intermittent, "sometimes", unclear cause, multiple components | `fishbone` | Complex problem needs structured cause enumeration |

Output the selected method and rationale before proceeding:

```
Selected method: {method}
Rationale: {why this method fits the problem}
```

### Step 2a: Five Whys (`why`)

Perform iterative root-cause analysis. For each level, ground the answer in evidence from the codebase -- read files, check logs, examine config. Do not speculate.

```markdown
## Five Whys Analysis

**Problem:** {problem description}

### Why 1: Why does {problem} occur?
**Answer:** {evidence-based answer}
**Evidence:** {file, line, log, or observable behavior that supports this}

### Why 2: Why does {answer-1} happen?
**Answer:** {evidence-based answer}
**Evidence:** {file, line, log, or observable behavior}

### Why 3: Why does {answer-2} happen?
**Answer:** {evidence-based answer}
**Evidence:** {file, line, log, or observable behavior}

### Why 4: Why does {answer-3} happen?
**Answer:** {evidence-based answer}
**Evidence:** {file, line, log, or observable behavior}

### Why 5: Why does {answer-4} happen?
**Answer:** {evidence-based answer}
**Evidence:** {file, line, log, or observable behavior}
```

Stop before 5 if the root cause is clearly reached (fixing it would prevent all upstream symptoms). Proceed past 5 if the chain has not yet reached a root cause.

The root cause is the answer where **fixing it prevents ALL upstream symptoms**.

```markdown
## Root Cause

{The identified root cause}

## Proposed Fix

{Concrete fix targeting the root cause, not the symptoms}

**Fixes symptom chain:** {brief trace showing how the fix propagates up to resolve the original problem}
```

### Step 2b: Root-Cause Tracing (`trace`)

Trace backward from the observable symptom through the code. At each step, read the relevant source files and identify what produced the problematic value or behavior.

```markdown
## Root-Cause Trace

**Symptom:** {error message, wrong output, crash, or unexpected behavior}

### Layer 1: Symptom
- **What:** {the observable symptom}
- **Where:** {file:line or component}
- **Immediate cause:** {what directly produced this symptom}

### Layer 2: Immediate Cause
- **What:** {the value, state, or call that caused Layer 1}
- **Where:** {file:line or component}
- **Upstream cause:** {what produced this value/state}

### Layer 3: Upstream
- **What:** {the earlier value, state, or call}
- **Where:** {file:line or component}
- **Upstream cause:** {what produced this}

{Continue until root cause is found...}
```

The root cause is the **first point where behavior diverged from expected**. This is where the fix belongs.

```markdown
## Root Cause

- **What:** {description of the divergence}
- **Where:** {file:line}
- **Expected behavior:** {what should have happened}
- **Actual behavior:** {what happened instead}

## Proposed Fix

{Concrete fix at the root cause location}

**Why here and not at the symptom:** {explanation of why fixing upstream is correct}
```

### Step 2c: Fishbone Analysis (`fishbone`)

Systematically enumerate potential causes across categories, then test each hypothesis against evidence.

```markdown
## Fishbone Analysis

**Problem (head):** {problem description}

### Code
- [ ] {potential cause: logic errors, missing edge cases, wrong algorithms}
- [ ] {potential cause}

### Data
- [ ] {potential cause: invalid input, missing data, stale cache, race conditions}
- [ ] {potential cause}

### Environment
- [ ] {potential cause: config, dependencies, versions, network, infrastructure}
- [ ] {potential cause}

### Process
- [ ] {potential cause: missing tests, skipped reviews, unclear specs, deployment gaps}
- [ ] {potential cause}
```

For each potential cause, investigate with evidence:

```markdown
## Hypothesis Testing

### {Category}: {Potential Cause}
- **Hypothesis:** {what would be true if this were the cause}
- **Test:** {how to verify -- file check, log analysis, reproduction step}
- **Result:** CONFIRMED / RULED OUT / INCONCLUSIVE
- **Evidence:** {what you found}

{Repeat for each potential cause...}
```

Synthesize findings:

```markdown
## Root Cause(s)

{One or more confirmed causes, with evidence}

## Contributing Factors

{Causes that are not root but made the problem worse or harder to detect}

## Proposed Fix

{Concrete fix addressing all confirmed root causes}

## Prevention

{What to change to prevent this class of problem in the future}
```

### Step 3: Summary

After completing the analysis, output a concise summary:

```markdown
## Kaizen Summary

- **Method:** {why / trace / fishbone}
- **Problem:** {original problem description}
- **Root Cause:** {one-line root cause}
- **Fix:** {one-line proposed fix}
- **Confidence:** {HIGH / MEDIUM / LOW} - {basis for confidence level}
```

If confidence is LOW, recommend additional investigation steps.
