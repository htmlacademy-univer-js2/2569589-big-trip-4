import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildFolder = resolve(__dirname, 'build');

export default {
  devtool: 'inline-source-map',
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: buildFolder,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: resolve(__dirname, 'public'),
        to: buildFolder,
        globOptions: {
          ignore: ['**/index.html'],
        }
      }],
    }),
    new HtmlWebpackPlugin({ template: resolve(__dirname, 'public/index.html') }),
  ],
}
