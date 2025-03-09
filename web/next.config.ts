import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `@use "@/app/scss/variables.module.scss" as *;`,
  },
};

export default nextConfig;
