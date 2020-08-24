const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
      exclude: [
        /(node_modules)/,
        /__tests__/
      ],
      use: ['babel-loader', 'eslint-loader']
    },
    {
      test: /\.pug$/,
      use: ['pug-loader']
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    ... htmlPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
  ]
};

module.exports = () => {
  return config;
};