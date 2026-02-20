import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.yamatoen.or.jp',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
  
  transpilePackages: ['gsap'],
};

export default nextConfig;