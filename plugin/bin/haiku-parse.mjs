#!/usr/bin/env node
// haiku-parse — frontmatter + JSON state parser for H·AI·K·U
//
// Zero dependencies. Runs anywhere Node.js is available.
//
// Usage:
//   haiku-parse get <file> <key>           Read a field
//   haiku-parse set <file> <key> <value>   Write a field
//   haiku-parse dump <file>                Dump all fields as JSON
//   haiku-parse keys <file>                List all field names
//
// Supports:
//   .md files  → reads/writes YAML frontmatter (between --- delimiters)
//   .json files → reads/writes JSON
//   .yaml/.yml files → reads/writes simple YAML (flat keys, arrays, nested objects)

import { readFileSync, writeFileSync } from "node:fs"
import { extname } from "node:path"

// Support --stdin flag: haiku-parse get --stdin key (reads JSON from stdin)
const args = process.argv.slice(2)
const stdinFlag = args.includes("--stdin")
const filteredArgs = args.filter(a => a !== "--stdin")
const [cmd, file, key, ...rest] = filteredArgs
const value = rest.join(" ")

if (!cmd || (!file && !stdinFlag)) {
  console.error("Usage: haiku-parse <get|set|dump|keys> <file|--stdin> [key] [value]")
  process.exit(1)
}

// ── YAML parser (simple subset: flat keys, arrays, basic nesting) ──────────

function parseYaml(text) {
  const data = {}
  let currentKey = ""
  let currentIndent = 0

  for (const line of text.split("\n")) {
    if (line.trim() === "" || line.trim().startsWith("#")) continue

    const indent = line.search(/\S/)
    const kvMatch = line.match(/^(\s*)([\w][\w.-]*):\s*(.*)$/)

    if (kvMatch) {
      const [, , k, v] = kvMatch
      currentKey = k
      currentIndent = indent

      if (v === "" || v === "[]" || v === "null") {
        data[k] = v === "[]" ? [] : v === "null" ? null : ""
      } else if (v.startsWith("[") && v.endsWith("]")) {
        data[k] = v.slice(1, -1).split(",").map(s => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean)
      } else if (v === "true") {
        data[k] = true
      } else if (v === "false") {
        data[k] = false
      } else if (v === "null") {
        data[k] = null
      } else if (/^-?\d+$/.test(v)) {
        data[k] = parseInt(v, 10)
      } else if (/^-?\d+\.\d+$/.test(v)) {
        data[k] = parseFloat(v)
      } else {
        data[k] = v.replace(/^["']|["']$/g, "")
      }
    } else if (indent > currentIndent && currentKey) {
      const itemMatch = line.match(/^\s+-\s+(.+)$/)
      if (itemMatch) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = []
        data[currentKey].push(itemMatch[1].trim())
      } else {
        // Nested key
        const nestedMatch = line.match(/^\s+([\w][\w.-]*):\s*(.*)$/)
        if (nestedMatch) {
          if (typeof data[currentKey] !== "object" || data[currentKey] === null || Array.isArray(data[currentKey])) {
            data[currentKey] = {}
          }
          const nv = nestedMatch[2].trim()
          data[currentKey][nestedMatch[1]] = nv === "null" ? null : nv.replace(/^["']|["']$/g, "")
        }
      }
    }
  }

  return data
}

function serializeYaml(data) {
  const lines = []
  for (const [k, v] of Object.entries(data)) {
    if (v === null || v === undefined) {
      lines.push(`${k}: null`)
    } else if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(`${k}: []`)
      } else {
        lines.push(`${k}: [${v.join(", ")}]`)
      }
    } else if (typeof v === "object") {
      lines.push(`${k}:`)
      for (const [nk, nv] of Object.entries(v)) {
        lines.push(`  ${nk}: ${nv === null ? "null" : nv}`)
      }
    } else if (typeof v === "boolean") {
      lines.push(`${k}: ${v}`)
    } else if (typeof v === "number") {
      lines.push(`${k}: ${v}`)
    } else {
      lines.push(`${k}: ${v}`)
    }
  }
  return lines.join("\n") + "\n"
}

// ── Frontmatter parser ─────────────────────────────────────────────────────

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: text }
  return { data: parseYaml(match[1]), body: match[2] }
}

function serializeFrontmatter(data, body) {
  return `---\n${serializeYaml(data)}---\n${body}`
}

// ── File I/O ──────────────────────────────────────────────────��─────────────

function readStdin() {
  try {
    return readFileSync(0, "utf8")
  } catch {
    return ""
  }
}

function readData(filePath) {
  // --stdin: read JSON from stdin, no file
  if (stdinFlag) {
    const raw = readStdin()
    return { data: JSON.parse(raw), body: null, format: "json" }
  }

  const raw = readFileSync(filePath, "utf8")
  const fileExt = extname(filePath).toLowerCase()

  if (fileExt === ".json") {
    return { data: JSON.parse(raw), body: null, format: "json" }
  }
  if (fileExt === ".yaml" || fileExt === ".yml") {
    return { data: parseYaml(raw), body: null, format: "yaml" }
  }
  // .md — frontmatter
  const { data, body } = parseFrontmatter(raw)
  return { data, body, format: "frontmatter" }
}

function writeData(filePath, data, body, format) {
  if (format === "json") {
    writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n")
  } else if (format === "yaml") {
    writeFileSync(filePath, serializeYaml(data))
  } else {
    writeFileSync(filePath, serializeFrontmatter(data, body))
  }
}

function coerceValue(v) {
  if (v === "true") return true
  if (v === "false") return false
  if (v === "null") return null
  if (/^-?\d+$/.test(v)) return parseInt(v, 10)
  if (/^-?\d+\.\d+$/.test(v)) return parseFloat(v)
  return v
}

// ── Commands ──────────────────────────────────────────────────────────���─────

try {
  if (cmd === "get") {
    // --stdin mode: haiku-parse get --stdin key → file=key, key=undefined
    const effectiveKey = stdinFlag ? file : key
    const effectiveFile = stdinFlag ? null : file
    if (!effectiveKey) { console.error("Usage: haiku-parse get <file> <key>"); process.exit(1) }
    const { data } = readData(effectiveFile)
    // Support dotted keys: composite_state.software
    const parts = effectiveKey.split(".")
    let val = data
    for (const p of parts) {
      if (val == null || typeof val !== "object") { val = undefined; break }
      val = val[p]
    }
    if (val === undefined || val === null) {
      process.stdout.write("")
    } else if (typeof val === "object") {
      process.stdout.write(JSON.stringify(val))
    } else {
      process.stdout.write(String(val))
    }
  } else if (cmd === "set") {
    if (!key) { console.error("Usage: haiku-parse set <file> <key> <value>"); process.exit(1) }
    const { data, body, format } = readData(file)
    // Support dotted keys
    const parts = key.split(".")
    let target = data
    for (let i = 0; i < parts.length - 1; i++) {
      if (target[parts[i]] == null || typeof target[parts[i]] !== "object") {
        target[parts[i]] = {}
      }
      target = target[parts[i]]
    }
    target[parts[parts.length - 1]] = coerceValue(value)
    writeData(file, data, body, format)
  } else if (cmd === "dump") {
    const { data } = readData(file)
    process.stdout.write(JSON.stringify(data, null, 2) + "\n")
  } else if (cmd === "keys") {
    const { data } = readData(file)
    process.stdout.write(Object.keys(data).join("\n") + "\n")
  } else {
    console.error(`Unknown command: ${cmd}`)
    process.exit(1)
  }
} catch (e) {
  console.error(`haiku-parse: ${e.message}`)
  process.exit(1)
}
