variable "sentry_base_url" {
  description = "Sentry API base URL. Defaults to SaaS; override for self-hosted."
  type        = string
  default     = "https://sentry.io/api/"
}

variable "sentry_organization" {
  description = "Sentry organization slug"
  type        = string
  default     = "gigsmart"
}
