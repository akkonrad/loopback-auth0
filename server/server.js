'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var auth0Jwt = require('loopback-auth0-jwt');

var app = module.exports = loopback();

var authConfig = {
  // secretKey    : process.env.AUTH0_SECRET,
  secretKey    : 'hwxVjD8rcog3eWu8pTvcPJtj_463dDhSKlMbqV_GZyoSgCNldZ-GQIyQTO3BhzRM',
  model        : 'User'
};

var auth = auth0Jwt(app, authConfig);

app.use('/api', auth.authenticated, function(req, res, next) {
  console.log('===========', 'req.accessToken', req.accessToken);
  next();
});

// catch error
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token, or no token supplied!');
  } else {
    res.status(401).send(err);
  }
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
