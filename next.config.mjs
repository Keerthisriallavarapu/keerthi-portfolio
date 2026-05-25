/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Three.js fiber has issues with strict mode
  transpilePackages: ['three'],
};

export default nextConfig;
