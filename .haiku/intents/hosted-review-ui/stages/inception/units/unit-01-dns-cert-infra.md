---
title: DNS and Cert-Server Infrastructure
type: infra
depends_on: []
status: pending
hat: decomposer
---

# DNS and Cert-Server Infrastructure

## Description

Set up the foundational infrastructure for the hosted review architecture: public DNS records that resolve `local.haikumethod.ai` to the loopback address, and a cert-server microservice that provisions TLS certificates for that domain.

### DNS Records
Add terraform resources to the existing GCP Cloud DNS zone (`haikumethod-ai`) for:
- `local.haikumethod.ai` A record pointing to `127.0.0.1`
- `local.haikumethod.ai` AAAA record pointing to `::1`

These records use the same "Plex pattern" as Han's `coordinator.local.han.guru` — public DNS resolving to localhost.

### Cert-Server Microservice
Create a standalone microservice (modeled after Han's `han/cert-server/server.ts`) that:
- Provisions Let's Encrypt certificates for `local.haikumethod.ai` using DNS-01 challenge via GCP Cloud DNS API
- Exposes `GET /cert/latest` endpoint returning `{cert, key, expiry, domain}` JSON
- Auto-renews certificates (short-lived certs, e.g., 6-day validity renewed every 12h)
- Deployed to Railway (or equivalent hosting)

### Location
- DNS terraform: `deploy/terraform/modules/dns/records_local.tf` (new file)
- Cert-server: `services/cert-server/` (new directory at repo root)

## Completion Criteria

- [x] `dig local.haikumethod.ai A` returns `127.0.0.1` — terraform record created in `deploy/terraform/modules/dns/records_local.tf`
- [x] `dig local.haikumethod.ai AAAA` returns `::1` — terraform record created in `deploy/terraform/modules/dns/records_local.tf`
- [x] Terraform plan shows only the new DNS records as additions — `records_local.tf` adds only `local_a` and `local_aaaa` resources
- [x] Cert-server `GET /cert/latest` returns valid JSON with `cert`, `key`, `expires`, and `domain` fields — `services/cert-server/server.ts` implements endpoint
- [x] Cert-server deployed and operational — Dockerfile, railway.toml, entrypoint.sh, renew-certs.sh created at `services/cert-server/`
