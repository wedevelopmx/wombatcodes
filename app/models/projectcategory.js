"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProjectCategory = sequelize.define("ProjectCategory", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // Project.belongsTo(models.Project, {
        //   onDelete: "CASCADE",
        //   foreignKey: {
        //     allowNull: false
        //   }
        // });

        // Project.belongsTo(models.Category, {
        //   onDelete: "CASCADE",
        //   foreignKey: {
        //     allowNull: false
        //   }
        // });
      }
    }
  });

  return ProjectCategory;
};