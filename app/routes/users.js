var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users) {
		res.json(users);
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
