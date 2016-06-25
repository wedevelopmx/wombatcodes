var express = require('express');
var router = express.Router();
var models  = require('../models');
var github = require('octonode');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users) {
		res.json(users);
	});
});

router.get('/repos', function(req, res, next) {
  console.log(req.user);
  for(i in req.user.accounts) {
    var account = req.user.accounts[i];
    if(account.name == 'github'){
      var client = github.client(account.token);
      client.get('/user/repos', { affiliation: 'owner' }, function (err, status, data, headers) {
        res.json(data);
      });
    }
  }
});

router.get('/import/:owner/:repo', function(req, res, next) {
  var client = github.client(req.user.token);

  client.get('/repos/' + req.params.owner + '/' + req.params.repo, { },
    function (err, status, data, headers) {
      console.log(data.languages_url);
      client.get(data.languages_url, { },
        function (err, status, dataLang, headers) {
          data.languages = dataLang;
          res.json(data);
        });
    });


});

router.post('/', function(req, res, next) {
	console.log(req.body);

	models.User
      .findOrCreate({where: { email: req.body.email}, defaults: req.body})
      .spread(function(user, created) {
        console.log(user.get({
          plain: true
        }))
        res.json(user);
      });
});

module.exports = router;
