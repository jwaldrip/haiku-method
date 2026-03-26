# Reviewer Reference

Companion to the Reviewer hat. Loaded on-demand for discipline checks and parallel review setup.

## Anti-Rationalization

| Excuse                                           | Reality                                                      |
| ------------------------------------------------ | ------------------------------------------------------------ |
| "Looks good to me"                               | Every LGTM needs evidence. What specifically did you verify? |
| "The tests pass so it's fine"                    | Passing tests prove what's tested, not what's missing.       |
| "These are minor issues"                         | Minor issues compound. Document them all.                    |
| "We can fix this in the next bolt"               | The next bolt inherits this bolt's debt. Fix now.            |
| "The implementation is different but equivalent" | Different means untested. Verify equivalence.                |
| "I trust the builder's judgment"                 | Trust but verify. Read the code, don't just scan it.         |

## Red Flags

- Approving without running tests
- Skipping criteria verification
- Not checking edge cases
- Rubber-stamping because "it looks right"

**All of these mean: STOP and verify each criterion with evidence before deciding.**

## Parallel Review Perspectives

The reviewer SHOULD fan out to multiple specialized review subagents for thorough coverage. Each perspective catches issues the others miss.

### Review Perspectives

| Perspective | Focus | When to Use |
|-------------|-------|-------------|
| **Security** | Injection, auth, data exposure, secrets | Always for code that handles user input, auth, or sensitive data |
| **Performance** | N+1 queries, unnecessary re-renders, memory leaks, large payloads | When code touches database queries, API endpoints, or rendering |
| **Architecture** | SOLID violations, coupling, abstraction boundaries, dependency direction | When code adds new modules, changes interfaces, or crosses boundaries |
| **Correctness** | Edge cases, off-by-one, null handling, race conditions, error paths | Always — this is the minimum viable review |
| **Test Quality** | Meaningful assertions, coverage gaps, flaky patterns, missing edge cases | Always when new tests were written |

### How to Fan Out

Launch multiple review subagents in a single message:

```
For each applicable perspective:
  Agent({
    subagent_type: "general-purpose",
    run_in_background: true,
    description: "{perspective} review: {unit}",
    prompt: "Review the implementation of {unit} from a {perspective} perspective.
             Focus ONLY on {perspective} concerns.
             Score each finding as high/medium/low confidence.
             Return a structured list of findings."
  })
```

Wait for all agents, then consolidate:
1. **De-duplicate** identical findings across perspectives
2. **Elevate** findings flagged by multiple perspectives (intersection = higher confidence)
3. **Consolidate** into a single structured completion marker

### Team Mode Integration

When `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` is enabled:
- Each review perspective runs as a **teammate**
- High-confidence findings are reported back to builder teammates **immediately** via SendMessage — builders can start fixing while other reviews are still running
- This creates a **streaming review** pattern: findings flow to builders as they're discovered, not batched at the end

```
Review Fan-Out (parallel):
  ├─► Security reviewer ──► finding → SendMessage to builder
  ├─► Performance reviewer ──► finding → SendMessage to builder
  ├─► Architecture reviewer ──► finding → SendMessage to builder
  └─► Correctness reviewer ──► finding → SendMessage to builder
                                              ↓
                                    Builder fixes as findings arrive
```

### Minimum vs Comprehensive Review

- **Minimum** (always): Correctness + Test Quality
- **Standard** (default): Minimum + Security + Performance
- **Comprehensive** (for critical units): Standard + Architecture

The reviewer selects depth based on the unit's complexity and risk. Single-file bug fixes get minimum review; multi-file features get comprehensive.
