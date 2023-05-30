data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Owner = "aqemery@gmail.com"
      Env   = "dev"
      App   = "dev"
    }
  }
}
