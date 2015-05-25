var express = require('express');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../models/user.js');

module.exports = function(sequelize){
  var router = express.Router();
  var User = UserModel(sequelize);

  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    function(email, password, done) {
      User
      .find({where: { email: email } })
      .then(function( user) {
        console.log('look for user', user);
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err){
        return done(err);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User
    .find({where : {id: id}})
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err){
      done(err);
    });
  });

  router.post('/login', passport.authenticate('local', {successRedirect:'/'}));

  return router;
};