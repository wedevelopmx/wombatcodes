var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
  		title: 'WombatCodes'});
});

router.get('/edit', function(req, res, next) {
	res.render('edit', {
  		title: 'WombatCodes'});
});

module.exports = router;
