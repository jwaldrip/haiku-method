import type { DemoConfig } from "./types"

const stepModules: Record<string, () => Promise<{ config: DemoConfig }>> = {
  software: () => import("./steps/software"),
  compliance: () => import("./steps/compliance"),
  "customer-success": () => import("./steps/customer-success"),
  "data-pipeline": () => import("./steps/data-pipeline"),
  documentation: () => import("./steps/documentation"),
  "executive-strategy": () => import("./steps/executive-strategy"),
  finance: () => import("./steps/finance"),
  hr: () => import("./steps/hr"),
  ideation: () => import("./steps/ideation"),
  "incident-response": () => import("./steps/incident-response"),
  legal: () => import("./steps/legal"),
  marketing: () => import("./steps/marketing"),
  migration: () => import("./steps/migration"),
  "product-strategy": () => import("./steps/product-strategy"),
  "project-management": () => import("./steps/project-management"),
  "quality-assurance": () => import("./steps/quality-assurance"),
  sales: () => import("./steps/sales"),
  "security-assessment": () => import("./steps/security-assessment"),
  training: () => import("./steps/training"),
  "vendor-management": () => import("./steps/vendor-management"),
}

export async function getDemoConfig(slug: string): Promise<DemoConfig | null> {
  const loader = stepModules[slug]
  if (!loader) return null
  const mod = await loader()
  return mod.config
}

export { type DemoConfig } from "./types"
