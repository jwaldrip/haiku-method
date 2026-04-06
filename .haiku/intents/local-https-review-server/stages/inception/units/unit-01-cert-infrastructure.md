---
name: unit-01-cert-infrastructure
type: backend
status: pending
depends_on: []
bolt: 0
hat: ""
refs:
  - knowledge/DISCOVERY.md
---

# Cert Infrastructure

## Description
Deploy a cert provisioning server and DNS configuration for `local.haikumethod.ai`.

## Scope
- Cert server (GCP Cloud Run) that provisions Let's Encrypt wildcard certs for `*.local.haikumethod.ai`
- DNS: `local.haikumethod.ai` A record → 127.0.0.1, AAAA record → ::1
- DNS: `certs.haikumethod.ai` pointing to the cert server
- Terraform module for cert server deployment
- Certbot renewal automation with Google Cloud DNS challenge

## Completion Criteria
- [ ] Cert server deployed and returning valid cert bundle at `certs.haikumethod.ai/review/latest`
- [ ] `local.haikumethod.ai` resolves to 127.0.0.1 from any client
- [ ] Cert is valid for `*.local.haikumethod.ai` (wildcard)
- [ ] Cert auto-renews before expiry
