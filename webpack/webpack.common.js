const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/scripts/index.js'),
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@scripts': path.resolve(__dirname, '../src/scripts'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@assets': path.resolve(__dirname, '../src/assets'),
    },
    extensions: ['.js'],
  },

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },

      // HTML — processes img src, link href etc. so webpack
      // picks up referenced assets and runs them through the
      // image/font rules below
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              // HtmlWebpackPlugin already handles the template;
              // html-loader only needs to resolve asset sources
              sources: true,
            },
          },
        ],
      },

      // Images
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // Inline assets smaller than 8kb as base64
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'assets/images/[name].[contenthash:8][ext]',
        },
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash:8][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),

    new ESLintPlugin({
      extensions: ['js'],
      emitWarning: true,
    }),
  ],
};
