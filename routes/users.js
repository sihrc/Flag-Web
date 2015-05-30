var express = require('express');
var UserModel = require('../models/user.js');
var error = require('./error.js');

module.exports = function(sequelize){
  var router = express.Router();
  var User = UserModel(sequelize);

  // Collection.belongsToMany(User, {through: CollectionUser});
  // User.belongsToMany(Collection, {through: CollectionUser});

  // POST new user request
  router.get('/:phone', function(req, res){
    console.log(req.params.phone);
    User.find({
      where: {
        phone: req.params.phone
      }
    })
    .then(function(user){
      if (user) {
        res.json({"error": 0, "data": user});
      } else {
        error("User not found", res);
      }
    })
    .catch(function(err){
      error(err, res);
    });
  });

  router.post('/new', function createUser(req, res) {
    console.log(req.body.phone);
    if (req.body.name && req.body.phone){
      var user = User.build({
        name: req.body.name,
        phone: req.body.phone
      });
      user
        .save()
        .then(function(user){
          if (user) {
            res.json({"error": 0, "message": "Request received", "data": user});
          }
        })
        .catch(function(err){
          error(err, res);
        });
    } else {
      error("Insufficient information to create user", res);
    }
  });

  router.get('/all', function(req, res){
    User.findAll({
      where:{
        Pending: false
      }
    })
    .then(function(users){
      if (users) {
        res.json({"error": 0, "users": users.map(function(user){
          return user.getReturnable();
        })})
      } else {
        error("No users found", res);
      }
    })
    .catch(function(err){
      error(err, res);
    });
  });

  return router;
}
