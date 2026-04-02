/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.tiktokcdn.com' },
      { protocol: 'https', hostname: '**.tiktok.com' },
      { protocol: 'https', hostname: '**.ytimg.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Aplica em todas as páginas do site
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none';",
          },
        ],
      },
    ]
  },
  // ... outras configs (como images)
};
export default nextConfig;
