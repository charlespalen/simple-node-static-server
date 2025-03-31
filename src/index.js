var path = require('path');
var fs = require('fs');
var express = require('express');
var https = require('https');
var http = require('http');
const bodyParser = require("body-parser");

var httpApp = express();
var app = express();

// ----- Register a middleware hook for global response headers
// ----- overrides express static header stuff
app.use(function(req, res, next) {

  if(req.url == '/') {
	  res.setHeader('Cache-Control','no-cache, no-store, must-revalidate');
	  res.setHeader('Pragma','no-cache');
	  res.setHeader('Expires','0');
  }
  
  next();
});
// ---------- STATIC FILES TO SERVE -----------------
app.use( express.static(__dirname + '/../client_runtime') );
// You can use a static path here so you don't need to move project files
//app.use( express.static('D:\\work\\a\\2025\\html') );

// ------- END STATIC FILES TO SERVE ----------------
// Set path to default views
// This does not use node templates but here is how you set them
/*
app.set('views', './runtime/default_views');
app.set('view engine', 'pug');

app.post("/formTest", function (req, res) {
	console.log("---------------POST ON formTest--------------");
    console.log(req.body);
	//res.send('Post Success');
	res.status(200).end();
});
*/

// ---------- GENERAL ERROR HANDLING ------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
	console.log('error', 'DEV-Server General Error Handler message: ' + err.message);
	console.log('error', 'DEV-Server General Error Handler stack: ' + err.stack);
    res.render('error', {
      message: err.message,
      error: err
    });
  });


// ---------- END GENERAL ERROR HANDLING --------------

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


var httpPort = normalizePort(process.env.PORT || '80');
var httpsPort = normalizePort(process.env.HTTPSPORT || '443');


http.createServer(app).listen( httpPort );

console.log("Running Node server on port: " + httpPort );
console.log("Place your static files in ./client_runtime");
console.log("Press Control + C to quit...");