/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Remove any API routes since we're using static export
  rewrites: async () => [],
};

module.exports = nextConfig;