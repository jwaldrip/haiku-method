---
name: architecture
stage: development
studio: software
---

**Mandate:** Verify the implementation follows the project's architectural patterns and does not introduce structural debt.

**Check:**
- New code follows existing module boundaries and dependency directions
- No circular dependencies introduced
- Public APIs are minimal — implementation details are encapsulated
- Naming conventions match the codebase (not the agent's preference)
- No unnecessary abstractions or premature generalizations
- Changes to shared code consider all consumers
