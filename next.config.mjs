/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.clerk.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
