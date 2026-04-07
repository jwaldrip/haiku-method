---
type: backend
status: pending
depends_on: []
quality_gates:
  - "cert-server responds at GET /haiku/latest with valid JSON containing cert, key, expires, domain fields"
  - "DNS A record for local.haikumethod.ai resolves to 127.0.0.1"
  - "DNS AAAA record for local.haikumethod.ai resolves to ::1"
  - "Let's Encrypt certificate is valid for *.local.haikumethod.ai verified by openssl s_client"
---

# Unit 01: Cert Microservice + DNS

Build a certificate provisioning microservice and configure DNS so that `local.haikumethod.ai` resolves to localhost.

## Scope

### DNS Records
- `local.haikumethod.ai` A → 127.0.0.1
- `local.haikumethod.ai` AAAA → ::1
- `certs.haikumethod.ai` CNAME → deployed service

### Cert Microservice
Follow the han `cert-server` pattern:
- Bun.ts or Node.js microservice deployed to Railway/similar
- Uses Let's Encrypt with DNS-01 challenge (via Cloudflare/Google Cloud DNS) for wildcard `*.local.haikumethod.ai`
- Short-lived certs (6-day), auto-renew when <48h remain
- Single endpoint: `GET /haiku/latest` returns `{cert, key, expires, domain}`
- Deploy at `certs.haikumethod.ai`

### Key Files
- New: `cert-server/` directory (microservice code)
- New: `deploy/terraform/` DNS record definitions (or manual DNS config doc)
