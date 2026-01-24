/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Dozvoljava placeholder slike (ako ih koristiš dok dizajniraš)
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co', // 🚀 OVO JE KLJUČNO: Dozvoljava slike s tvog (i bilo kojeg) Supabase projekta
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;