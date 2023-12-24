/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'api.nitdgplug.org',
      },
    ],
  },
};

module.exports = nextConfig;
