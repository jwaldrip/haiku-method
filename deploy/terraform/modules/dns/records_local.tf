# "Plex pattern" — public DNS resolving to localhost for local HTTPS.
# This allows local development servers to use real TLS certificates
# by pointing local.haikumethod.ai to the loopback address.

resource "google_dns_record_set" "local_a" {
  name         = "local.${google_dns_managed_zone.zone.dns_name}"
  managed_zone = google_dns_managed_zone.zone.name
  type         = "A"
  ttl          = 3600
  rrdatas      = ["127.0.0.1"]
}

resource "google_dns_record_set" "local_aaaa" {
  name         = "local.${google_dns_managed_zone.zone.dns_name}"
  managed_zone = google_dns_managed_zone.zone.name
  type         = "AAAA"
  ttl          = 3600
  rrdatas      = ["::1"]
}
