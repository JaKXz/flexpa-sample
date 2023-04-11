const UnoCSS = require("@unocss/webpack").default;

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  webpack: (config, context) => {
    config.plugins = [...config.plugins, UnoCSS()];
    config.optimization = {
      ...config.optimization,
      realContentHash: true,
    };

    // if (context.buildId !== "development") {
    // * disable filesystem cache for build
    // * https://github.com/unocss/unocss/issues/419
    // * https://webpack.js.org/configuration/cache/
    // config.cache = false;
    // }

    return config;
  },
};
