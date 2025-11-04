/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hindi-ocr-documents.s3.ap-south-1.amazonaws.com'], // Add your S3 bucket domain
  },
}

module.exports = nextConfig
