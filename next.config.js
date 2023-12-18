/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'qwerty-happy.s3.amazonaws.com' }],
  },
}

module.exports = nextConfig
