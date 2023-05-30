## Common Configuration
variable "prefix" {
  type        = string
  description = "The string prefix to attach to all deployed stacklet assets. This is useful for labeling the team and stage of the deployment."
}

variable "domain_name" {
  type        = string
  description = "Root domain name"
}


variable "domain_zone" {
  type        = string
  description = "Root zone of domain name"
}


variable "bucket_name" {
  type        = string
  description = "Bucket domain name"
}