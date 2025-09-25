/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you want to bypass type/ESLint errors in Netlify builds:
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // (Optional) If you are using next export
  output: 'export',
};

module.exports = nextConfig;
