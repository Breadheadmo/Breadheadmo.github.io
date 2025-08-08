const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // GitHub Pages static export
  basePath: '', // or '/REPO_NAME'
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd393bihxdnepv7.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
