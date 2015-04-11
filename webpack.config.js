// Webpack configuration to use with the build task.

var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  // Create also a "lib" chunk with common libraries, e.g. react.
  entry: {
    lib: ['react', 'react-router'],
    main: './app/client.jsx'
  },

  output: {
    path: './build/public/js',
    publicPath: '/js/',
    filename: 'main.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production") // This has effect on the react lib size
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("bundle.css", {
      allChunks: true
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['jsx'] },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
      { test: /\.(png|jpg)$/, loader: 'url-loader'},
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },

  externals: {}
};
