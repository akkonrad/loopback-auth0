'use strict';

module.exports = function() {
  return function(req, res, next) {
    console.log('midcheck req.accessToken: ', req.accessToken);
    next();
  };
};
