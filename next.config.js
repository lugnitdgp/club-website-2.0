/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "api.nitdgplug.org",
      },
    ],
  },
};

module.exports = nextConfig;
