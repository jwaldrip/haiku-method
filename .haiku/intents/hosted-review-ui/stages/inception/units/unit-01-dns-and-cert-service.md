---
title: DNS and Cert Service
status: pending
type: backend
depends_on: []
---

# DNS and Cert Service

Set up the infrastructure that makes local HTTPS possible: DNS records for `local.haikumethod.ai` resolving to loopback, and a microservice that provisions Let's Encrypt certificates.

## Scope

- Add `local.haikumethod.ai` DNS records in GCP Cloud DNS via Terraform:
  - A record → 127.0.0.1
  - AAAA record → ::1
- Deploy cert microservice that:
  - Uses certbot with DNS-01 challenge against GCP Cloud DNS
  - Provisions Let's Encrypt certs for `local.haikumethod.ai`
  - Serves certs via `GET /certs/latest` → `{ cert, key, expires, domain }`
  - Auto-renews before expiry (short-lived certs, 6-day rotation like han)
- Deploy target: Railway (consistent with han pattern) or GCP Cloud Function

## Completion Criteria

- [ ] `dig local.haikumethod.ai A` returns 127.0.0.1
- [ ] `dig local.haikumethod.ai AAAA` returns ::1
- [ ] `curl https://{cert-service-url}/certs/latest` returns valid JSON with cert, key, expires, domain fields
- [ ] Certificate subject matches `local.haikumethod.ai`
- [ ] Terraform plan applies cleanly with new DNS records

## Files to Create/Modify

- `deploy/terraform/modules/dns/records_local.tf` — new DNS records
- `deploy/terraform/modules/dns/variables.tf` — new variable for enable flag
- `deploy/terraform/main.tf` — wire up enable flag
- `deploy/cert-service/` — new microservice (server, Dockerfile, certbot wrapper)
