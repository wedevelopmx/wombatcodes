var express = require('express');
var router = express.Router();
var models  = require('../models');


	/* GET home page. */
	router.get('/', function(req, res, next) {
		console.log('GET: -----------------------USER------------------');
		console.log(req.user);

		res.render('index', {
	  		title: 'Geospatial App'});
	});

module.exports = router;
