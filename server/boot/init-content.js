'use strict';

module.exports = function(app) {
  var Article = app.models.Article;
  var Secret = app.models.Secret;
  var Mine = app.models.Mine;

  for (var i = 0; i < 3; i++) {
    Article.create({
      title: 'Article #' + Math.round(Math.random() * 1000),
      userId: 1,
    }, function(err, article) {
    });

    Secret.create({
      title: 'Secret #' + Math.round(Math.random() * 1000),
      userId: 1,
    }, function(err, secret) {
    });

    Mine.create({
      power: Math.round(Math.random() * 10000),
      userId: 1,
    }, function(err, secret) {
    });
  }
};
