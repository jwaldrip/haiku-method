// hooks/index.ts — Hook dispatch for the H·AI·K·U binary
//
// Called via: haiku hook <name>
// Hooks receive input on stdin (JSON from Claude Code hook system)
// and output to stdout (text injected into the conversation).

import { readFileSync } from "node:fs"
import { promptGuard } from "./prompt-guard.js"
import { workflowGuard } from "./workflow-guard.js"
import { redirectPlanMode } from "./redirect-plan-mode.js"

// Read stdin synchronously (hooks are synchronous)
function readStdin(): string {
	try {
		return readFileSync(0, "utf8")
	} catch {
		return ""
	}
}

export async function runHook(name: string, _args: string[]): Promise<void> {
	const input = readStdin()
	let parsed: Record<string, unknown> = {}
	try {
		if (input.trim()) parsed = JSON.parse(input)
	} catch { /* stdin may not be JSON for all hooks */ }

	const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || ""

	switch (name) {
		case "prompt-guard":
			await promptGuard(parsed, pluginRoot)
			break
		case "workflow-guard":
			await workflowGuard(parsed, pluginRoot)
			break
		case "redirect-plan-mode":
			await redirectPlanMode(parsed, pluginRoot)
			break
		default:
			// For hooks not yet ported to TypeScript, fall through
			// The shell wrapper will handle them
			console.error(`haiku: hook '${name}' not implemented in binary — use shell fallback`)
			process.exit(2) // Exit code 2 = not handled, shell wrapper should try .sh
	}
}
