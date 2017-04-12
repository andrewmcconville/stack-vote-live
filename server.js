// server.js
const compress = require('compression');
const express = require('express');
const app = express();
//const path = require('path');

// activate gzip
app.use(compress());

//send prerendered pages to bots
//app.use(require('prerender-node'));

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname + '/dist/index.html'));
// });

app.get('*', function (req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://' + req.hostname + req.url);
    }
    else {
        //res.sendFile(path.join(__dirname + '/dist/index.html'));
        next();
    }
});