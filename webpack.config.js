const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.js", "./src/webpackTest/index.js"],
  // entry: {
  //   a: "./src/index.js",
  //   b: {
  //     dependOn: "a",
  //     import: "./src/webpackTest/index.js",
  //   },
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag",
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "none",
  target: "node",
};
