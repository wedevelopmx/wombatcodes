// config/passport.js

var passport = require('passport');

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy  = require('passport-twitter').Strategy;
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

// code for login (use('local-login', new LocalStategy))
// code for signup (use('local-signup', new LocalStategy))
// code for facebook (use('facebook', new FacebookStrategy))
// code for twitter (use('twitter', new TwitterStrategy))

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

            console.log(profile);

            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            var user = {
              displayname: profile.displayName,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              email: profile.emails[0].value,
              profileimageurl: profile.photos[0].value,
              provider: profile.provider,
              providerid: profile.id
            };

            models.User
              .findOrCreate({where: { providerid: user.providerid }, defaults: user})
              .spread(function(user, created) {
                console.log(user.get({
                  plain: true
                }));
                return done(null, user);
              });
        });

    }));

module.exports = passport;