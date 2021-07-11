import * as path from 'path';
import * as webpack from 'webpack';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

/* setup all npm packages as externals */
const nodeExternals = require('webpack-node-externals');

/**
 * @description webpack build config ( for typescript )
 */
const config: webpack.Configuration = {
  mode: 'none',
  entry: './bin/mupi.ts',
  devtool: 'inline-source-map',
  target: 'node',
  watch: process.env.NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  },
  // webpack4 optimizations
  optimization: {
    nodeEnv: false,
    minimize: true,
  },
  // to let __dirname & __filename not a relative path
  node: {
    __filename: false,
    __dirname: false,
  },
  plugins: [],
};

export default config;