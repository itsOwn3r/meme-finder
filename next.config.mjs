import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";


/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.ctfassets.net',
        },
        {
          protocol: 'https',
          hostname: 'api.producthunt.com',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
      ],
    },
};

// export default nextConfig;

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;
