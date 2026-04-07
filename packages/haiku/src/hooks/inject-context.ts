// inject-context — SessionStart hook for H·AI·K·U
//
// Injects the active intent's stage scope into every conversation start
// (including after compaction). This ensures the agent always knows what
// stage it's in and what outputs are appropriate.
//
// Everything else (hat instructions, mechanics, tool calls) comes from
// the MCP prompt handlers via haiku:run.

import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join, basename } from "node:path"
import matter from "gray-matter"

function out(s: string): void {
	process.stdout.write(s + "\n")
}

function getRepoRoot(): string {
	let dir = process.cwd()
	for (let i = 0; i < 20; i++) {
		if (existsSync(join(dir, ".haiku"))) return dir
		const parent = join(dir, "..")
		if (parent === dir) break
		dir = parent
	}
	return process.cwd()
}

function findActiveIntent(root: string): { slug: string; dir: string; studio: string; activeStage: string } | null {
	const intentsDir = join(root, ".haiku", "intents")
	if (!existsSync(intentsDir)) return null

	for (const slug of readdirSync(intentsDir)) {
		const intentFile = join(intentsDir, slug, "intent.md")
		if (!existsSync(intentFile)) continue
		const raw = readFileSync(intentFile, "utf8")
		const { data } = matter(raw)
		if (data.status === "active") {
			return {
				slug,
				dir: join(intentsDir, slug),
				studio: (data.studio as string) || "ideation",
				activeStage: (data.active_stage as string) || "",
			}
		}
	}
	return null
}

function readStageDefinition(studio: string, stage: string, pluginRoot: string): { description: string; unitTypes: string[]; body: string } | null {
	for (const base of [join(process.cwd(), ".haiku", "studios"), join(pluginRoot, "studios")]) {
		const stageFile = join(base, studio, "stages", stage, "STAGE.md")
		if (!existsSync(stageFile)) continue
		const raw = readFileSync(stageFile, "utf8")
		const { data, content } = matter(raw)
		return {
			description: (data.description as string) || stage,
			unitTypes: (data.unit_types as string[]) || [],
			body: content.trim(),
		}
	}
	return null
}

function readStageState(intentDir: string, stage: string): { phase: string; hat: string; unit: string; bolt: number } {
	const result = { phase: "", hat: "", unit: "", bolt: 1 }

	// Read phase from state.json
	const stateFile = join(intentDir, "stages", stage, "state.json")
	if (existsSync(stateFile)) {
		try {
			const state = JSON.parse(readFileSync(stateFile, "utf8"))
			result.phase = (state.phase as string) || ""
		} catch { /* */ }
	}

	// Find active unit for hat/bolt
	const unitsDir = join(intentDir, "stages", stage, "units")
	if (existsSync(unitsDir)) {
		for (const f of readdirSync(unitsDir).filter(f => f.endsWith(".md"))) {
			const raw = readFileSync(join(unitsDir, f), "utf8")
			const { data } = matter(raw)
			if (data.status === "active") {
				result.hat = (data.hat as string) || ""
				result.unit = basename(f, ".md")
				result.bolt = (data.bolt as number) || 1
				break
			}
		}
	}

	return result
}

export async function injectContext(_input: Record<string, unknown>, pluginRoot: string): Promise<void> {
	const root = getRepoRoot()
	const intent = findActiveIntent(root)

	if (!intent) {
		out("## H·AI·K·U")
		out("")
		out("No active intent. Use `/haiku:new` to create one or `/haiku:run` to resume.")
		return
	}

	const { slug, dir, studio, activeStage } = intent

	if (!activeStage) {
		out(`## H·AI·K·U: ${slug}`)
		out("")
		out("Intent active but no stage set. Use `/haiku:run` to advance.")
		return
	}

	const stageDef = readStageDefinition(studio, activeStage, pluginRoot)
	const state = readStageState(dir, activeStage)

	out(`## H·AI·K·U: ${slug}`)
	out("")
	out(`**Stage:** ${activeStage} | **Phase:** ${state.phase || "—"} | **Studio:** ${studio}`)
	if (state.unit) out(`**Unit:** ${state.unit} | **Hat:** ${state.hat} | **Bolt:** ${state.bolt}`)
	out("")

	if (stageDef) {
		out(`### Stage: ${activeStage}`)
		out("")
		out(`**${stageDef.description}**`)
		if (stageDef.unitTypes.length > 0) out(`**Unit types:** ${stageDef.unitTypes.join(", ")}`)
		out("")
		out(stageDef.body)
		out("")
		out(`> All work in this stage MUST be within its scope. Do not produce outputs belonging to other stages.`)
		out("")
	}

	out("Use `/haiku:run` to continue.")
}
