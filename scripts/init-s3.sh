#!/bin/bash

echo "Initializing S3 bucket for LocalStack..."

# Wait for LocalStack to be ready
until aws --endpoint-url=http://localhost:4566 s3 ls; do
  echo "Waiting for LocalStack to be ready..."
  sleep 2
done

# Create the development bucket
aws --endpoint-url=http://localhost:4566 s3 mb s3://ecom-dev-bucket

# Set bucket policy for public read access (development only)
aws --endpoint-url=http://localhost:4566 s3api put-bucket-policy \
  --bucket ecom-dev-bucket \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::ecom-dev-bucket/*"
      }
    ]
  }'

echo "S3 bucket 'ecom-dev-bucket' created successfully!"
