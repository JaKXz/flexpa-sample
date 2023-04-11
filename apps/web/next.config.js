const path = require("path");
const UnoCSS = require("@unocss/webpack").default;

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  webpack: (config) => {
    config.plugins = [...config.plugins, UnoCSS()];
    config.optimization = {
      ...config.optimization,
      realContentHash: true,
    };

    return config;
  },
};
