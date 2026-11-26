/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid PackFileCacheStrategy ENOENT errors during rapid dev edits
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
