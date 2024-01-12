/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
    ],

    // domains: [
    //   "res.cloudinary.com",
    //   "lh3.googleusercontent.com",
    //   "avatars.githubusercontent.com",
    // ],
  },
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
};

module.exports = nextConfig;
