import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server for the Docker image (infra/docker/web.Dockerfile).
  output: "standalone",
  // Trace from the monorepo root so packages/shared is included in the build.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  poweredByHeader: false,
};

export default nextConfig;
