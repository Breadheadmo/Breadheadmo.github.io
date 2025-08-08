const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/YOUR_REPO_NAME', // Replace with your repo name
  assetPrefix: '/YOUR_REPO_NAME/',
};

module.exports = withPWA(nextConfig);
