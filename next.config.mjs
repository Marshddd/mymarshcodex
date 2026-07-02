/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Allow Render and other cloud environments
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:10000'],
    },
  },
};

export default nextConfig;
