'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var auth0Jwt = require('loopback-auth0-jwt');

var app = module.exports = loopback();

var authConfig = {
  // secretKey    : process.env.AUTH0_SECRET,
  secretKey: 'hwxVjD8rcog3eWu8pTvcPJtj_463dDhSKlMbqV_GZyoSgCNldZ-GQIyQTO3BhzRM',
  model: 'User',
};

var auth = auth0Jwt(app, authConfig);

app.use('/api', auth.authenticated, debugToken);
app.use(handleError);

app.start = start;

boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

/** * Core functions ****/

/**
 * Token debugger
 *
 * @param req
 * @param res
 * @param next
 */
function debugToken(req, res, next) {
  console.log('===========');
  console.log('debugToken.accessToken', req.accessToken);
  console.log('===========');
  next();
}

/**
 * Handle request errors
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
function handleError(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token, or no token supplied!');
  } else {
    res.status(401).send(err);
  }
}

/**
 * Start listening
 */
function start() {
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
}
