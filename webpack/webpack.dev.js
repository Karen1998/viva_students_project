const { merge } = require('webpack-merge');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'eval-source-map',

  output: {
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
  },

  module: {
    rules: [
      // CSS with style-loader for HMR support in development
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env.development'),
      safe: true,
      silent: true,
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    port: 3000,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },

  optimization: {
    runtimeChunk: 'single',
  },
});
