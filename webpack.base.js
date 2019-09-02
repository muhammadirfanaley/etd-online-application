const { resolve } = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

// if the size of resource is bigger than threshold,
// it will be splitted into additional file
// rather than bundle to javascript file
const resourceThreshold = 8192

module.exports = {
  entry: {
    app: './src/index.js',
  },

  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules(?!\/@target-energysolutions)/,
        loader: 'babel-loader',
        options: {},
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: resourceThreshold,
          name: 'images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        loader: 'url-loader',
        options: {
          limit: resourceThreshold,
          name: 'media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: 'url-loader',
        options: {
          limit: resourceThreshold,
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },

  resolveLoader: {
    alias: {
      worker: 'workerize-loader?name=js/[hash:8]',
    },
  },

  resolve: {
    modules: [resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.mjs', '.js', '.jsx'],
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, './static'),
        to: 'static',
        ignore: ['.*'],
      },
    ]),
  ],
}
