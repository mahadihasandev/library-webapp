import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators:false,
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'placehold.co',
        port:"",
        
      },
      {
          protocol:'https',
          hostname:'m.media-amazon.com',
          port:"",
      },
      {
          protocol:'https',
          hostname:'ik.imagekit.io',
          port:"",
      },
    ]
  },
  reactCompiler: true,
  typescript:{
    ignoreBuildErrors:true,
  },

};

export default nextConfig;
