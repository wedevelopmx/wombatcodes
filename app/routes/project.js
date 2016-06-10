var express = require('express');
var router = express.Router();
var models  = require('../models');
var Sequelize = require('sequelize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Project.findAll({
    attributes: ['title', 'description', 'price', 'rate', 'type'],
    include: [{
      attributes: ['name'],
      model: models.Category,
      through: {
        attributes: [],
        model: models.ProjectCategory
      }
    }, {
      attributes: ['name', 'lines'],
      model: models.Language,
      as: 'languages'
    }]  
  })
  .then(function(users) {
		res.json(users);
	});
});

router.post('/', function(req, res, next) {
  var data = req.body;
  data.UserId = req.user.id;

  models.Project.create(req.body)
    .then(function(project) {
      //Saving Categories
      var categories = [];
      data.categories.forEach(function(category) {
        console.log(' - ' + category.name);
        categories.push({ProjectId: project.id, CategoryId: category.id});
      });

      models.ProjectCategory.bulkCreate(categories).then(function() {
        console.log('Categories created');
      });
      
      //Saving Languages
      data.languages.forEach(function(obj) {
        console.log(' - ' + obj.name);
        obj.ProjectId = project.id;
      });

      models.Language.bulkCreate(data.languages).then(function() {
        console.log('Languages created');
      });
      
      res.json(project);
    });
});

module.exports = router;
