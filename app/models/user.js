"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    displayName: { type: DataTypes.STRING, name: 'display_name' },
    company: { type: DataTypes.STRING, name: 'company' },
    location: { type: DataTypes.STRING, name: 'location' },
    bio: { type: DataTypes.TEXT, name: 'bio' },
    email: { type: DataTypes.STRING, name: 'email' },
    website: { type: DataTypes.STRING, name: 'website' },
    twitter: { type: DataTypes.STRING, name: 'twitter' },
    github: { type: DataTypes.STRING, name: 'github' },
    linkedin:{ type: DataTypes.STRING, name: 'linkedin' },
    avatar: { type: DataTypes.STRING, name: 'avatar' }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Account, {as: 'accounts'});
        User.hasMany(models.Project);
      }
    }
  });

  return User;
};

// {
//   displayName: 'Cristian Colorado',
//   company: 'WeDevelop',
//   blog: 'http://cristiancolorado.com',
//   location: 'Mexico',
//   email: '',
//   bio: '',
//   avatar: 'https://avatars.githubusercontent.com/u/1531306?v=3',
//   vendor: '',
//   vendorJoinedAt: '2012-03-13T02:43:52Z',
//   vendorUpdatedAt: '2016-05-25T17:35:12Z',
//   vendorHtmlUrl: 'https://github.com/ccoloradoc',
//   vendorReposUrl: 'https://api.github.com/users/ccoloradoc/repos'
//   token: ''
//  }
