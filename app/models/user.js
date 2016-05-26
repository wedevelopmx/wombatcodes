"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    displayName: { type: DataTypes.STRING, name: 'display_name' },
    company: { type: DataTypes.STRING, name: 'company' },
    blog: { type: DataTypes.STRING, name: 'blog' },
    location: { type: DataTypes.STRING, name: 'location' },
    email: { type: DataTypes.STRING, name: 'email' },
    bio: { type: DataTypes.TEXT, name: 'bio' },
    avatar: { type: DataTypes.STRING, name: 'avatar' },
    vendor: { type: DataTypes.STRING, name: 'vendor' },
    vendorJoinedAt: { type: DataTypes.DATE, name: 'vendor_joined_at'},
    vendorUpdatedAt: { type: DataTypes.DATE, name: 'vendor_updated_at'},
    vendorHtmlUrl: { type: DataTypes.STRING, name: 'vendor_html_url' },
    vendorReposUrl: { type: DataTypes.STRING, name: 'vendor_repos_url' },
    token: { type: DataTypes.STRING, name: 'token' }
  }, {
    classMethods: {
      associate: function(models) {
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
