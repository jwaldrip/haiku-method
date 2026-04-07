---
name: unit-01-prompts-server
type: backend
status: pending
depends_on: []
bolt: 0
hat: ""
refs:
  - knowledge/DISCOVERY.md
---

# MCP Prompts Server Infrastructure

## Description

Add `prompts/list` and `prompts/get` handlers to the MCP server. Register the `prompts` capability. Implement the prompt registry pattern where each prompt has a name, description, arguments schema, and a handler function that returns `PromptMessage[]`.

## Completion Criteria

- [ ] MCP server declares `prompts: { listChanged: true }` capability
- [ ] `prompts/list` returns all 21 prompts with name, description, arguments
- [ ] `prompts/get` dispatches to the correct prompt handler by name
- [ ] Prompt handlers receive parsed arguments and return `PromptMessage[]`
- [ ] Multi-message format: user/assistant/user pattern with context baked in
- [ ] Error handling: invalid name → -32602, missing args → -32602
