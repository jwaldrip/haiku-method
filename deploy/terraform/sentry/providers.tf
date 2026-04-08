terraform {
  required_version = ">= 1.0"

  required_providers {
    sentry = {
      source  = "jianyuan/sentry"
      version = "~> 0.14"
    }
  }

  backend "gcs" {
    bucket = "gigsmart-oss-terraform-state"
    prefix = "haiku-sentry"
  }
}

provider "sentry" {
  base_url = var.sentry_base_url
  # Token via SENTRY_AUTH_TOKEN env var
}
