import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 테스트 환경에서 모든 외부 도메인 허용
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // 추가 보안을 위해 dangerouslyAllowSVG는 false로 유지
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
