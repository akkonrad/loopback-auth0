'use strict';

module.exports = function (app) {

  app.get('loopback-component-auto-migrate-done').then(function () {
    var Article = app.models.Article;
    var Secret = app.models.Secret;
    var Mine = app.models.Mine;

    console.log('creatind dummy content');

    Article.create({
      title: '(user) Article #' + Math.round(Math.random() * 1000),
    }, function (err, article) {
    });

    Secret.create({
      title: '(user) Secret #' + Math.round(Math.random() * 1000),
    }, function (err, secret) {
    });

    Mine.create({
      power: Math.round(Math.random() * 10000),
    }, function (err, secret) {
    });

    console.log('content created.');
  });
};
