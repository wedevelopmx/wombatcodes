"use strict";

module.exports = function(sequelize, DataTypes) {
  var Language = sequelize.define("Language", {
    name: DataTypes.STRING,
    lines: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        Language.belongsTo(models.Project, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Language;
};