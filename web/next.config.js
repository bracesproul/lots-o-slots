/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APOLLO_SERVER_URI: process.env.APOLLO_SERVER_URI,
  },
  async redirects() {
    return [
      {
        source: '/admin/withdrawals',
        destination: '/admin/payments',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
