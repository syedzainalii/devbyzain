/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/files/**',
      },
      {
        protocol: 'https',
        hostname: 'devbyzain-backend.vercel.app',
        pathname: '/api/**',
      },
    ],
  },
};

export default nextConfig;
