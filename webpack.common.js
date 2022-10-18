const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          "html-loader",
          {
            loader: "posthtml-loader",
            options: {
              plugins: [
                require("posthtml-modules")({
                  root: path.resolve(__dirname, "src"),
                }),
                require("posthtml-include")({
                  root: path.resolve(__dirname, "src"),
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            // make all svg images to work in IE
            iesafe: true,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/Designs/pages/Login.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/Designs/pages/Order.html",
      filename: "Order.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/Designs/pages/Login.html",
      filename: "Login.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/Designs/pages/home.html",
      filename: "home.html",
    }),
  ],
};
