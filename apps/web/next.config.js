// @ts-check

/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@fieldbee/ui"],
  modularizeImports: {
    "@fieldbee/ui/icons/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "api.fieldbee.com",
      },
    ],
  },
};
