const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  // your existing Next.js config
})
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/YOUR_REPO_NAME', // e.g. /my-nextjs-site
  assetPrefix: '/YOUR_REPO_NAME/',
};

module.exports = nextConfig;
