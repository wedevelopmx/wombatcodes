"use strict";

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    name: { type: DataTypes.STRING, name: 'name' },
    joinedAt: { type: DataTypes.DATE, name: 'joined_at'},
    updatedAt: { type: DataTypes.DATE, name: 'updated_at'},
    htmlUrl: { type: DataTypes.STRING, name: 'html_url' },
    reposUrl: { type: DataTypes.STRING, name: 'repos_url' },
    token: { type: DataTypes.STRING, name: 'token' }
  }, {
    classMethods: {
      associate: function(models) {
        Account.belongsTo(models.User);
      }
    }
  });

  return Account;
};
