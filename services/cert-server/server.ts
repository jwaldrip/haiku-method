/**
 * Certificate Distribution Server
 *
 * Serves Let's Encrypt certificates for local.haikumethod.ai.
 * Certificates are renewed automatically via certbot with Google Cloud DNS.
 */

import { readFileSync } from 'node:fs';
import { X509Certificate } from 'node:crypto';

const CERT_DIR = '/etc/letsencrypt/live/local.haikumethod.ai';
const CERT_FILE = `${CERT_DIR}/fullchain.pem`;
const KEY_FILE = `${CERT_DIR}/privkey.pem`;
const DOMAIN = 'local.haikumethod.ai';
const PORT = Number(process.env.PORT) || 3000;

Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/health') {
      return Response.json({ status: 'ok' });
    }

    if (url.pathname === '/cert/latest') {
      try {
        const cert = readFileSync(CERT_FILE, 'utf-8');
        const key = readFileSync(KEY_FILE, 'utf-8');
        const x509 = new X509Certificate(cert);

        return Response.json({
          cert,
          key,
          expires: x509.validTo,
          domain: DOMAIN,
        });
      } catch (error) {
        console.error('Failed to read certificates:', error);
        return Response.json(
          { error: 'Certificate not found' },
          { status: 404 }
        );
      }
    }

    return Response.json({ error: 'Not found' }, { status: 404 });
  },
});

console.log(`Certificate server running on port ${PORT}`);
