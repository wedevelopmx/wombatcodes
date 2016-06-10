"use strict";

module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    pageContent: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    rate: DataTypes.FLOAT,
    type: DataTypes.STRING,
    githubId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {

        //Project.hasMany(models.ProjectCategory, as: 'projectCategories');
        Project.belongsToMany(models.Category, {through: 'ProjectCategory'});
        Project.hasMany(models.Language, {as: 'languages'});

        Project.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Project;
};