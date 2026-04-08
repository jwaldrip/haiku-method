import { execSync } from "node:child_process"
import type { NextConfig } from "next"
import { withSentryConfig } from "@sentry/nextjs"

const isDev = process.env.NODE_ENV === "development"

function detectRepoSlug(): string {
	try {
		const remote = execSync("git remote get-url origin", { encoding: "utf8" }).trim()
		// Handle SSH (git@github.com:owner/repo.git) and HTTPS (https://github.com/owner/repo.git)
		const match = remote.match(/github\.com[:/](.+?)(?:\.git)?$/)
		if (match) return match[1]
	} catch {}
	return "TheBushidoCollective/haiku-method"
}

const nextConfig: NextConfig = {
	...(isDev ? {} : { output: "export" }),
	images: {
		unoptimized: true,
	},
	trailingSlash: true,
	env: {
		NEXT_PUBLIC_REPO_SLUG: detectRepoSlug(),
	},
}

export default withSentryConfig(nextConfig, {
	// Suppress source map upload (no auth token configured yet)
	silent: true,
	// Disable automatic instrumentation that requires a server runtime
	// (this is a statically exported site)
	disableLogger: true,
})
