// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require("./package");

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = "window";
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
      "@/pages/*": path.resolve(__dirname, "src/pages"),
      "@components/*": path.resolve(__dirname, "src/components"),
    };
    return config;
  },
  //本地配置
  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.disableHostCheck = true;
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      config.historyApiFallback = true;
      config.hot = true;
      config.open = false;
      return config;
    };
  },
};
