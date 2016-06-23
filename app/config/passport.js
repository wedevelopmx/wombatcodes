// config/passport.js

var passport = require('passport');
var github = require('octonode');

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var models       = require('../models');

// load the auth variables
var configAuth = require('./auth');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log('------------------- serialize ---------------------' + user.id);
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log('------------------- deserialize ---------------------' + id);
    models.User
        .findOne({ where: {id: id} }).then(function(user) {
          console.log(user.dataValues);
            done(null, user.dataValues);
        });

});

// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
passport.use(new GoogleStrategy({
    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
          var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

          var user = {
            displayName: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            provider: profile.provider,
            providerid: profile.id,
            token: accessToken
          };

          models.User
            .findOrCreate({ where: { email: user.email }, defaults: user })
            .spread(function(user, created) {
              if(!created && user.token !== accessToken)
                user.update({ token: accessToken}, {fields: ['token']})
                  .then(function(updateUser) {
                       console.log(updateUser);
                  });

              return done(null, user);
            });
      
        });

    }));

// =========================================================================
// GITHUB ==================================================================
// =========================================================================
passport.use(new GitHubStrategy({
    clientID        : configAuth.githubAuth.clientID,
    clientSecret    : configAuth.githubAuth.clientSecret,
    callbackURL     : configAuth.githubAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {

      var client = github.client(accessToken);

      var user = { 
        displayName: profile.displayName,
        company: profile._json.company || '',
        blog: profile._json.blog || '',
        location: profile._json.location || '',
        email: profile._json.email || '',
        bio: profile._json.bio || '',
        avatar: profile._json.avatar_url || '',
        vendor: profile.provider,
        vendorJoinedAt: profile._json.created_at || '',
        vendorUpdatedAt: profile._json.updated_at || '',
        vendorHtmlUrl: profile._json.html_url || '',
        vendorReposUrl: profile._json.repos_url  || '',
        token: accessToken
      }

      client.get('/user/emails', {}, function (err, status, data, headers) {
        for(i in data) {
          if(data[i].primary !== undefined && data[i].primary) {
            user.email = data[i].email;
            console.log(user);

            models.User
              .findOrCreate({ where: { email: user.email }, defaults: user })
              .spread(function(user, created) {
                if(!created && user.token !== accessToken)
                  user.update({ token: accessToken}, {fields: ['token']})
                    .then(function(updateUser) {
                         console.log(updateUser);
                    });

                return done(null, user);
              });
          }
        }
      });

    }));

module.exports = passport;