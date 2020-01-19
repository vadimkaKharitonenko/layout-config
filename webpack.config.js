const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StylelintPlugin = require('stylelint-webpack-plugin');

const pages = [];

function sortChunks(a, b) {
  const order = ['app', 'vendors'];
  return order.findIndex(
    item => b.names[0].includes(item),
  ) - order.findIndex(item => a.names[0].includes(item));
}

fs
  .readdirSync(path.resolve(__dirname, 'src', 'pages'))
  .forEach((file) => {
    pages.push(file.split('/', 2));
  });

const htmlPlugins = pages.map(fileName => new HtmlWebpackPlugin({
  filename: `${fileName}.html`,
  template: `./src/pages/${fileName}/${fileName}.pug`,
  alwaysWriteToDisk: true,
  inject: 'body',
  hash: true,
  chunksSortMode: sortChunks,
}));

const config = {
  entry: {
    app: './src/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
  },
  devServer: {
    port: 3000,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: ['babel-loader', 'eslint-loader']
    },
    {
      test: /\.ts?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ],
      exclude: /node_modules/,
      
    },
    {
      test: /\.pug$/,
      use: ['pug-loader']
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  'browserlist': ['> 1%', 'last 2 versions']
                })
              ],
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      })
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        name: 'img/[name].[ext]'
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]'
      }
    },
    {
      test: /\.(mp4)$/,
      loader: 'file-loader',
      options: {
        name: 'videos/[name].[ext]'
      }
    },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new StylelintPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    ... htmlPlugins,
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
  ]
};

module.exports = () => {
  return config;
};