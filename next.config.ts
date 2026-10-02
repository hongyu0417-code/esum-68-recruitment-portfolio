import type { NextConfig } from 'next';
import path from 'node:path';
import webpack from 'webpack';

const nextConfig: NextConfig = {
  webpack: (config) => {
    if (process.env.VERCEL) {
      const cloudflareStub = path.resolve(process.cwd(), 'lib/vercel-cloudflare-workers.ts');
      config.resolve.alias['cloudflare:workers'] = cloudflareStub;
      config.plugins.push(new webpack.NormalModuleReplacementPlugin(/^cloudflare:workers$/, cloudflareStub));
    }
    return config;
  },
};

export default nextConfig;
