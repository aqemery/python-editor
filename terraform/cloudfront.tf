data "aws_cloudfront_cache_policy" "CachingDisabled" {
  name = "Managed-CachingDisabled"
}

resource "aws_cloudfront_origin_access_identity" "dev" {}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.dev.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.dev.id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.dev.cloudfront_access_identity_path
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  aliases = ["${var.domain_name}"]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = aws_s3_bucket.dev.id
    cache_policy_id        = data.aws_cloudfront_cache_policy.CachingDisabled.id
    viewer_protocol_policy = "allow-all"

    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = aws_lambda_function.dev_origin_request.qualified_arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.dev.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/404.html"
    error_caching_min_ttl = 5
  }

}