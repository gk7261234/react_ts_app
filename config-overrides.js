const path = require("path");
const { name } = require("./package");
const webpack = require("webpack");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}`;
    config.output.libraryTarget = "umd";
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = "window";
    for (const rule of config.module.rules) {
      if (!rule.oneOf) continue;

      for (const one of rule.oneOf) {
        if (one.loader && one.loader.includes("babel-loader") && one.options && one.options.plugins) {
          one.options.plugins = one.options.plugins.filter(
            (plugin) => typeof plugin !== "string" || !plugin.includes("react-refresh")
          );
        }
      }
    }

    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof webpack.HotModuleReplacementPlugin) && !(plugin instanceof ReactRefreshPlugin)
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/custom_hooks"),
    };
    return config;
  },
  chainWebpack: (config) => {
    // 配置全局scss
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach((element) => {
      element
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: ["./src/assets/styles/reset.css"],
        });
    });
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.disableHostCheck = true;
      config.headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      };
      config.historyApiFallback = true;
      return config;
    };
  },
};
