import { mkdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"

const CERT_DIR = join(homedir(), ".haiku", "certs")
const CERT_PATH = join(CERT_DIR, "local.haikumethod.ai.cert")
const KEY_PATH = join(CERT_DIR, "local.haikumethod.ai.key")
const META_PATH = join(CERT_DIR, ".meta.json")

const DEFAULT_CERT_SERVER_URL = "https://cert-server-production.up.railway.app"

interface CertMeta {
	expiresAt: string
}

function getCertServerUrl(): string {
	return process.env.HAIKU_CERT_SERVER_URL ?? DEFAULT_CERT_SERVER_URL
}

async function ensureCertDir(): Promise<void> {
	await mkdir(CERT_DIR, { recursive: true })
}

async function readCachedMeta(): Promise<CertMeta | null> {
	try {
		const raw = await readFile(META_PATH, "utf8")
		return JSON.parse(raw) as CertMeta
	} catch {
		return null
	}
}

async function readCachedCerts(): Promise<{ cert: string; key: string } | null> {
	try {
		const [cert, key] = await Promise.all([
			readFile(CERT_PATH, "utf8"),
			readFile(KEY_PATH, "utf8"),
		])
		return { cert, key }
	} catch {
		return null
	}
}

function isCacheValid(meta: CertMeta): boolean {
	const expiry = new Date(meta.expiresAt)
	return expiry.getTime() > Date.now()
}

async function fetchCertsFromServer(): Promise<{ cert: string; key: string; expiresAt: string }> {
	const url = `${getCertServerUrl()}/cert/latest`
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`Cert server responded with ${res.status}: ${res.statusText}`)
	}
	const body = (await res.json()) as { cert: string; key: string; expires: string; domain: string }
	if (!body.cert || !body.key || !body.expires) {
		throw new Error("Invalid response from cert server: missing cert, key, or expires")
	}
	return { cert: body.cert, key: body.key, expiresAt: body.expires }
}

async function cacheCerts(cert: string, key: string, expiresAt: string): Promise<void> {
	await ensureCertDir()
	const meta: CertMeta = { expiresAt }
	await Promise.all([
		writeFile(CERT_PATH, cert, "utf8"),
		writeFile(KEY_PATH, key, "utf8"),
		writeFile(META_PATH, JSON.stringify(meta, null, 2), "utf8"),
	])
}

/**
 * Get TLS certificates for the local HTTPS server.
 *
 * Fetches from the cert server and caches locally. Returns cached certs if
 * still valid and the cert server is unreachable.
 */
export async function getCertificates(): Promise<{ cert: string; key: string }> {
	await ensureCertDir()

	const meta = await readCachedMeta()
	const cached = await readCachedCerts()

	// Try fetching fresh certs from the server
	try {
		const fresh = await fetchCertsFromServer()
		await cacheCerts(fresh.cert, fresh.key, fresh.expiresAt)
		return { cert: fresh.cert, key: fresh.key }
	} catch (err) {
		// If we have a valid cache, use it
		if (cached && meta && isCacheValid(meta)) {
			console.error(
				`Warning: cert server unreachable (${err instanceof Error ? err.message : String(err)}), using cached certs (expires ${meta.expiresAt})`,
			)
			return cached
		}
		// No valid cache — propagate the error
		throw new Error(
			`Failed to fetch certificates and no valid cache available: ${err instanceof Error ? err.message : String(err)}`,
		)
	}
}
