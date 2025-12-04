import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ftp.goit.study"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
