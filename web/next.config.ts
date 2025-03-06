import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `@import "@/app/variables.module.scss";`,
  },
};

export default nextConfig;
