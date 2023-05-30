data "archive_file" "lambda_zip_origin_request" {
  type        = "zip"
  output_path = "lambda_zip_file_int_1.zip"
  source {
    content  = file("../lambdas/origin-request.py")
    filename = "origin-request.py"
  }
}

resource "aws_lambda_function" "dev_origin_request" {
  filename         = data.archive_file.lambda_zip_origin_request.output_path
  source_code_hash = data.archive_file.lambda_zip_origin_request.output_base64sha256
  handler          = "origin-request.lambda_handler"

  function_name = "${var.prefix}_origin_request"

  runtime = "python3.9"

  role    = aws_iam_role.lambda_edge_exec.arn
  publish = true
}