/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // DISABLE WHEN PRESENTING AND USING DEVELOPMENT MODE
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
