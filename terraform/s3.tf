resource "aws_s3_bucket" "dev" {
  bucket = var.bucket_name
}


resource "aws_s3_bucket_ownership_controls" "dev" {
  bucket = aws_s3_bucket.dev.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "dev" {
  bucket = aws_s3_bucket.dev.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

}


data "aws_iam_policy_document" "allow_stacklet_accounts" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.dev.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.dev.iam_arn]
    }
  }

  statement {
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
    actions = [
      "s3:*",
    ]
    resources = [
      aws_s3_bucket.dev.arn,
      "${aws_s3_bucket.dev.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "allow_stacklet_accounts" {
  bucket = aws_s3_bucket.dev.id
  policy = data.aws_iam_policy_document.allow_stacklet_accounts.json
}
