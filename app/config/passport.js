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
        .findOne({
          where: { id: id },
          include: [{
            attributes: ['name', 'token'],
            model: models.Account,
            as: 'accounts'
          }]
        })
        .then(function(user) {
          console.log(user.get({
            plain: true
          }));
            done(null, user.get({ plain: true }));
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
            //company: { type: DataTypes.STRING, name: 'company' },
            //location: { type: DataTypes.STRING, name: 'location' },
            //bio: { type: DataTypes.TEXT, name: 'bio' },
            email: profile.emails[0].value,
            //website: { type: DataTypes.STRING, name: 'website' },
            //twitter: { type: DataTypes.STRING, name: 'twitter' },
            //github: { type: DataTypes.STRING, name: 'github' },
            //linkedin:{ type: DataTypes.STRING, name: 'linkedin' },
            avatar: profile.photos[0].value
          };

          var account = {
            name: profile.provider,
            providerId: profile.id,
            // joinedAt: ,
            // updatedAt: ,
            // htmlUrl: ,
            // reposUrl: ,
            token: accessToken
          };

          models.User
            .findOrCreate({ where: { email: user.email }, defaults: user })
            .spread(function(user, userCreated) {

              //Making the relationship
              account.UserId = user.id;

              models.Account
                .findOrCreate({ where: { userId: user.id, name: account.name }, defaults: account })
                .spread(function(account, accountCreated) {

                  if(!accountCreated && account.token !== accessToken)
                    account.update({ token: accessToken}, { fields: ['token'] })
                      .then(function(updateUser) {

                      });
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

      var githubUser = {
        company: profile._json.company || '',
        location: profile._json.location || '',
        bio: profile._json.bio || '',
        github: profile._json.html_url || ''
      };

      var account = {
        name: profile.provider,
        providerId: profile.id,
        joinedAt: profile._json.created_at || '',
        updatedAt: profile._json.updated_at || '',
        htmlUrl: profile._json.html_url || '',
        reposUrl: profile._json.repos_url  || '',
        token: accessToken
      };

      var orClause = [];
      client.get('/user/emails', {}, function (err, status, email, headers) {
        for(i in email) {
          orClause.push({ email: email[i].email });
        }

        //Finding the user with the github email reference
        models.User
          .findOne({ where: { $or: orClause } })
          .then(function(user) {

            //Making the relationship
            account.UserId = user.id;

            //Find or Create Account
            models.Account
            .findOrCreate({ where: { userId: user.id, name: account.name }, defaults: account })
            .spread(function(account, created) {

              //Update user information
              if(created) {
                user.update(githubUser, { fields: ['company', 'location', 'bio', 'github'] }).then(function(user){
                  console.log('Updated user');
                });
              } else {
                user.update({ token: accessToken}, {fields: ['token']}).then(function(user){
                  console.log('Updated user');
                });
              }
            });

            return done(null, user);
          });

          //TODO: Validate what happend when user github account does not include google's email

      });

    }));

module.exports = passport;
