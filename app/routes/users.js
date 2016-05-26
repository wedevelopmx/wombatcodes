var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users) {
		res.json(users);
	});
});

router.get('/repos', function(req, res, next) {
  console.log(req.user.token);
  var client = github.client(req.user.token);

  client.get('/user/repos', { affiliation: 'owner' }, function (err, status, data, headers) {
    res.json(data);
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
