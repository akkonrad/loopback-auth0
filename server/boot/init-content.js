'use strict';

module.exports = function(app) {
  var Article = app.models.Article;
  var Secret = app.models.Secret;

    for (var i = 0; i < 3; i++) {
      Article.create({
        title: 'Article #' + Math.round(Math.random() * 1000)
      }, function(err, article) {
      });

      Secret.create({
        title: 'Secret #' + Math.round(Math.random() * 1000)
      }, function(err, secret) {
      });
    }
};
