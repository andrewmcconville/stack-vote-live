// server.js
const compress = require('compression');
const express = require('express');
const app = express();
const path = require('path');

// activate gzip
app.use(compress());

// send prerendered pages to bots
app.use(require('prerender-node'));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});