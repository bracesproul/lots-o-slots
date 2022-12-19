/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APOLLO_SERVER_URI: process.env.APOLLO_SERVER_URI
  }
}

module.exports = nextConfig
