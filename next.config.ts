import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the whole site as plain HTML files in /out, ready for Cloudflare.
  // Redirects live in public/_redirects, because Next.js redirects need a server.
  output: "export",
};

export default nextConfig;
