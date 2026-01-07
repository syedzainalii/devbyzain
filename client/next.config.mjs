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
        pathname: '/api/files/**',
      },
    ],
  },
  async rewrites() {
    // Determine API URL at build time
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://devbyzain-backend.vercel.app';
    const isProduction = process.env.NODE_ENV === 'production' || apiUrl.includes('vercel.app');
    const backendUrl = isProduction ? 'https://devbyzain-backend.vercel.app' : 'http://localhost:8000';
    
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/api/files/:path*`,
      },
    ];
  },
};

export default nextConfig;
