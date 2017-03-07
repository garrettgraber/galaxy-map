import path from 'path';
import express from 'express';
import ip from 'ip';
import mongoose from 'mongoose';
import cors from 'cors';

const DatabaseLinks = require('docker-links').parseLinks(process.env);

console.log("DatabaseLinks: ", DatabaseLinks);

if(DatabaseLinks.hasOwnProperty('api')) {

  var API = 'http://' + DatabaseLinks.api.hostname + ':' + DatabaseLinks.api.port;

} else {

  var API = 'http://localhost:8107'

}


console.log("API: ", API);


if(Object.getOwnPropertyNames(DatabaseLinks).length !== 0) {



  console.log("Hooking up to database");

  mongoose.connect('mongodb://' + DatabaseLinks.mongo.hostname + ':' + DatabaseLinks.mongo.port);



  const db = mongoose.connection;
  const Schema = mongoose.Schema;

  const PlanetSchema = new Schema({
      system      : String,
      sector      : String,
      region      : String,
      coordinates : String,
  });


  PlanetSchema.set('autoIndex', false);

  const PlanetModel = mongoose.model('PlanetModel', PlanetSchema);
  // console.log("collections: ", PlanetModel);


  const CoordinateSchema = new Schema({
    coordinates: String,
  });

  CoordinateSchema.set('autoIndex', true);

  const CoordinateModel = mongoose.model('CoordinateModel', CoordinateSchema);


  db.on('error', function(error) {
    console.error.bind(console, 'connection error:');
  });
  db.once('open', function() {
      console.log("connected to mongo database ");
    PlanetModel.count({}, function(err, count) {

      console.log("Total Planets in Database: ", count);

    });
  });

}

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8107 : process.env.PORT;
const app = express();


console.log("DatabaseLinks: ", DatabaseLinks);
console.log("ip: ", ip.address());



if (isDeveloping) {

  let webpack = require('webpack');
  let webpackMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');
  let config = require('./webpack.config.js');

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    quiet: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    stats: {
      colors: true,
    }
  });





  const bundlePath = path.join(__dirname, './public/build/index.html');

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get(/^\/(?!api).*/, function response(req, res) {
    console.log("\ncall made to webpack");
    res.write(middleware.fileSystem.readFileSync(bundlePath));
    // res.end();
  });
  app.get('/api/*', function(req, res) {

    console.log("\ncall made to api: ", API + req.originalUrl);
    // req.session.valid = true;

    res.redirect(API + req.originalUrl);
  });

} else {
  const staticPath = path.join(__dirname, 'public/build')
  app.use(express.static(staticPath));
}


// var mapServerUrl = 'http://172.17.0.3:8100';
var utcTimeZoneOffset = -7;

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

});

// app.use(cors());

// const corsOptions = {
//   origin: API
// }

// app.use(cors(corsOptions))



// app.all('/api', function(req, res) {
//   // req.session.valid = true;
//   res.redirect(API);
// });


// app.get('/all', function(req, res) {


//   PlanetModel.find({}, function (err, docs) {
//     // docs.forEach
//     console.log(docs);
//     console.log("All Planets");
//     res.json(docs);
//   });
// });

// app.get('/search', function(req, res) {

//   console.log("req.query: ", req.query);

//   // var system = req.params('system');
//   // var region = req.params('region');
//   // var sector = req.params('sector');
//   // var coordinates = req.params('coordinates');

//   PlanetModel.find(req.query, function(err, docs) {
//     // docs.forEach
//     console.log("docs: ", docs);
//     res.json(docs);   
//   });



// });

// app.get('/populated-areas', function(req, res) {

//   // PlanetModel.find({system}, function(err, docs) {
//   //   // docs.forEach
//   //    console.log("docs: ", docs);
//   //    res.json(docs);   
//   // });

//   CoordinateModel.find({}, function(err, result) {

//     console.log("Total Coordinates in Database: ", result.length);
//     res.json(result);

//   });



// });



app.listen(port, ip.address(), function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://' + ip.address() + ':%s/ in your browser.', port, port);
});