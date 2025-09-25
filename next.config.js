/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ✅ Ignore type errors in production builds
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Ignore lint errors in production builds
    ignoreDuringBuilds: true,
  },
  // If you want static export
  output: 'export',
};

module.exports = nextConfig;
