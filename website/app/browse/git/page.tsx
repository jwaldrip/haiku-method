"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { GitHubProvider } from "@/lib/browse/github-provider"
import { GitLabProvider } from "@/lib/browse/gitlab-provider"
import type { BrowseProvider } from "@/lib/browse/types"
import { PortfolioView } from "../components/PortfolioView"

const TOKEN_KEY_PREFIX = "haiku-browse-token:"

function GitBrowseInner() {
	const searchParams = useSearchParams()

	const [provider, setProvider] = useState<BrowseProvider | null>(null)
	const [needsAuth, setNeedsAuth] = useState(false)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [tokenInput, setTokenInput] = useState("")

	// Parse repo from query: /browse/git?repo=github.com/org/repo&branch=main
	const repoParam = searchParams.get("repo") || ""
	const branch = searchParams.get("branch") || ""

	const { host, repoPath } = useMemo(() => {
		const parts = repoParam.split("/").filter(Boolean)
		if (parts.length < 3) return { host: "", repoPath: "" }
		return { host: parts[0], repoPath: parts.slice(1).join("/") }
	}, [repoParam])

	const isGitHub = host === "github.com"

	useEffect(() => {
		if (!host || !repoPath) {
			setError(repoParam ? "Invalid repository path. Expected: github.com/org/repo" : null)
			setLoading(false)
			return
		}

		const tokenKey = `${TOKEN_KEY_PREFIX}${host}`
		const storedToken = typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null

		async function init() {
			let prov: (GitHubProvider | GitLabProvider) & BrowseProvider

			if (isGitHub) {
				const parts = repoPath.split("/")
				if (parts.length < 2) {
					setError("GitHub path must be owner/repo")
					setLoading(false)
					return
				}
				prov = new GitHubProvider(parts[0], parts[1], branch, storedToken)
			} else {
				prov = new GitLabProvider(host, repoPath, branch, storedToken)
			}

			const accessible = await prov.isAccessible()
			if (!accessible) {
				if (storedToken) localStorage.removeItem(tokenKey)
				setNeedsAuth(true)
				setLoading(false)
				return
			}

			setProvider(prov)
			setLoading(false)
		}

		init()
	}, [host, repoPath, branch, isGitHub, repoParam])

	const handleTokenSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!tokenInput.trim()) return
		const tokenKey = `${TOKEN_KEY_PREFIX}${host}`
		localStorage.setItem(tokenKey, tokenInput.trim())
		window.location.reload()
	}

	// No repo param — show a "paste URL" prompt
	if (!repoParam && !loading) {
		return (
			<div className="mx-auto max-w-xl px-4 py-16 text-center">
				<h1 className="mb-4 text-2xl font-bold">Browse Remote Repository</h1>
				<p className="mb-4 text-stone-600 dark:text-stone-400">
					Use the repo parameter to specify which repository to browse.
				</p>
				<Link href="/browse/" className="text-teal-600 hover:text-teal-700">
					&larr; Back to Browse
				</Link>
			</div>
		)
	}

	if (loading) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center">
				<div className="text-stone-500">Connecting to {host}...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="mx-auto max-w-xl px-4 py-16 text-center">
				<h1 className="mb-4 text-2xl font-bold">Error</h1>
				<p className="text-stone-600 dark:text-stone-400">{error}</p>
				<Link href="/browse/" className="mt-4 inline-block text-teal-600 hover:text-teal-700">
					Back to Browse
				</Link>
			</div>
		)
	}

	if (needsAuth) {
		return (
			<div className="mx-auto max-w-xl px-4 py-16">
				<nav className="mb-8 text-sm text-stone-500 dark:text-stone-400">
					<Link href="/browse/" className="hover:text-stone-900 dark:hover:text-white">Browse</Link>
					<span className="mx-2">/</span>
					<span className="text-stone-900 dark:text-white">{host}</span>
				</nav>

				<h1 className="mb-2 text-2xl font-bold">Authentication Required</h1>
				<p className="mb-6 text-stone-600 dark:text-stone-400">
					This repository is private. Enter a personal access token with read access.
				</p>

				<div className="rounded-xl border border-stone-200 p-6 dark:border-stone-700">
					<h3 className="mb-2 text-sm font-semibold">
						{isGitHub ? "GitHub Personal Access Token" : "GitLab Personal Access Token"}
					</h3>
					<p className="mb-4 text-xs text-stone-500">
						{isGitHub
							? "Generate at GitHub Settings > Developer Settings > Personal Access Tokens. Needs 'repo' scope."
							: `Generate at ${host}/-/user_settings/personal_access_tokens. Needs 'read_repository' scope.`}
					</p>
					<form onSubmit={handleTokenSubmit} className="flex gap-2">
						<input
							type="password"
							value={tokenInput}
							onChange={(e) => setTokenInput(e.target.value)}
							placeholder="ghp_... or glpat-..."
							className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-mono placeholder:text-stone-400 focus:border-teal-500 focus:outline-none dark:border-stone-700 dark:bg-stone-900"
						/>
						<button type="submit" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
							Connect
						</button>
					</form>
					<p className="mt-3 text-xs text-stone-400">
						Token stored in localStorage only. Never sent to haikumethod.ai.
					</p>
				</div>
			</div>
		)
	}

	if (provider) {
		return (
			<PortfolioView
				provider={provider}
				onBack={() => { window.location.href = "/browse/" }}
				repoLabel={`${host}/${repoPath}${branch ? ` (${branch})` : ""}`}
			/>
		)
	}

	return null
}

export default function GitBrowsePage() {
	return (
		<Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><div className="text-stone-500">Loading...</div></div>}>
			<GitBrowseInner />
		</Suspense>
	)
}
