/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['blob.v0.dev'],
    unoptimized: true,
  },
  // Optimize bundle size
  //swcMinify: true,
  // Reduce bundle size by excluding large dependencies
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
