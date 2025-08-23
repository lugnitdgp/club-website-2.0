/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "api.nitdgplug.org",
      },
      {
        hostname: "media.dev.to"
      },
      {
        hostname: "images.unsplash.com"
      },
      {
        hostname: "randomuser.me"
      },
      {
        hostname: "cdnjs.cloudflare.com"
      }
    ],
  },
};

module.exports = nextConfig;
