var express = require('express');
var router = express.Router();
var models  = require('../models');
var Sequelize = require('sequelize');

router.get('/', function(req, res, next) {
  models.Category.findAll().then(function(category) {
		res.json(category);
	});
});

router.post('/', function(req, res, next) {
  models.Category
    .findOrCreate({where: { name: req.body.name}, defaults: req.body})
    .spread(function(category, created) {
      console.log(category.get({
        plain: true
      }))
      res.json(category);
    });
});

module.exports = router;
