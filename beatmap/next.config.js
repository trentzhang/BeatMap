/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

module.exports = nextConfig;
