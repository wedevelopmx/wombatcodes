var express = require('express');
var router = express.Router();
var models  = require('../models');
var Sequelize = require('sequelize');
var github = require('octonode');

/* GET users listing. */
router.get('/', function(req, res, next) {

  var user = {
    attributes: ['id', 'displayName', 'avatar'],
    model: models.User
  };

  if(req.query.userId !== undefined)
    user.where = {
      id: req.query.userId
    };

  models.Project.findAll({
    attributes: ['title', 'description', 'pageContent', 'price', 'rate', 'type'],
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
    }, user]
  })
  .then(function(users) {
		res.json(users);
	});
});

router.post('/', function(req, res, next) {
  var project = req.body;
  var sync = req.user.sync;

  //Creating Project Based on Github repository
  if(sync.github != undefined){
    var client = github.client(sync.github.token);

    client.get('/repos/' + project.owner + '/' + project.repository, { },
      function (err, status, repository, headers) {
        console.log(repository);
        var project = {
          title: repository.name,
          description: repository.name,
          clone: repository.clone_url,
          vendor: 'github',
          vendorId: repository.id,
          UserId: req.user.id
        };

        console.log(project);

        models.Project.create(project)
          .then(function(project) {

            client.get(repository.languages_url, { },
              function (err, status, repoLanguages, headers) {
                var languages = [];

                console.log(repoLanguages);

                //Saving Languages
                for (language in repoLanguages) {
                  languages.push({
                      name: language,
                      lines: repoLanguages[language],
                      ProjectId: project.id
                  });
                }

                console.log(languages);

                models.Language.bulkCreate(languages).then(function() {
                  console.log('Languages created');
                });

                res.json(project);
              });
          });
    });
  }
});

module.exports = router;
