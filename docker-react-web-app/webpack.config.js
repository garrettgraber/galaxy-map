


// var path = require('path');
// var webpack = require('webpack');


// module.exports = {
//   context: __dirname + "/",
//   entry: {
//     javascript: './scripts/index.js',
//     html: './index.html'
//   },
//   output: {
//     path: __dirname + "/dist",
//     filename: "bundle.js"
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       }
//     ]
//   }
// }



var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var javascriptEntryPath = path.resolve(__dirname, 'src', 'index.js');
var htmlEntryPath = path.resolve(__dirname, 'src', 'index.html');
var buildPath = path.resolve(__dirname, 'public', 'build');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true', 
    javascriptEntryPath,
    htmlEntryPath,
    "./src"
  ],
  output: {
    publicPath: "/",
    path: buildPath,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
    },
    {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]',
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },
    // {
    //   //IMAGE LOADER
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   loader:'file'
    // },
    // {
    //   test: /\.css$/,
    //   loader: 'style-loader'
    // },
    // {
    //   test: /\.css$/,
    //   loader: 'css-loader',
    //   query: {
    //     modules: true,
    //     localIdentName: '[name]__[local]___[hash:base64:5]'
    //   }
    // }
    // {
    //   test: /\.css/,
    //   loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
    //   include: [
    //       path.resolve(__dirname, "src/css")
    //   ]
    // },
    // {
    //     test: /\.css$/,
    //     loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"}),
    //     include: [
    //       path.resolve(__dirname, "src/css")
    //     ]
    // },
    {
      test: /\.(jpg|png)$/,
      loader: 'file-loader',
      // loader: 'file-loader?name=[path][name].[ext]'
      options: {
        name: './images/[name].[ext]',
      }
    },
], 
  },
  plugins: [ 
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // new ExtractTextPlugin("main.css", {allChunks: true})
  ]
}