const { merge } = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  output: {
    filename: 'scripts/[name].[contenthash:8].bundle.js',
    chunkFilename: 'scripts/[name].[contenthash:8].chunk.js',
    publicPath: '/viva_students_project/',
  },

  module: {
    rules: [
      // CSS extracted to separate file with content hashing
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css',
      chunkFilename: 'styles/[name].[contenthash:8].chunk.css',
    }),

    new Dotenv({
      path: path.resolve(__dirname, '../.env.production'),
      safe: true,
      silent: true,
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],

    // Split vendor and app code into separate chunks
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },

    runtimeChunk: 'single',
    moduleIds: 'deterministic',
  },

  performance: {
    hints: 'warning',
    maxEntrypointSize: 512 * 1024,
    maxAssetSize: 512 * 1024,
  },
});
