


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

var javascriptEntryPath = path.resolve(__dirname, 'src', 'index.js');
var htmlEntryPath = path.resolve(__dirname, 'src', 'index.html');
var buildPath = path.resolve(__dirname, 'public', 'build');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true', 
    javascriptEntryPath,
    htmlEntryPath
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
      //IMAGE LOADER
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader:'file'
    },
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
    //   test: /\.(jpg|png)$/,
    //   // loader: 'file-loader',
    //   loader: 'file-loader?name=/images/[name].[ext]'
    //   // options: {
    //   //   name: './images/[name].[ext]',
    //   // }
    // },
], 
  },
  plugins: [ 
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}