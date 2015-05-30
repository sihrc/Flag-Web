var Sequelize = require('sequelize');
var scrypt = require('scrypt');

// configure scrypt
var scryptParameters = scrypt.params(0.1);
scrypt.hash.config.keyEncoding = "ascii";
scrypt.verify.config.keyEncoding = "ascii";
scrypt.hash.config.outputEncoding = "base64";
scrypt.verify.config.hashEncoding = "base64";

module.exports = function(db){
  return db.define('User', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    lat: {
      type: Sequelize.FLOAT,
      unique: false,
      allowNull: true
    },
    lon: {
      type: Sequelize.FLOAT,
      unique: false,
      allowNull: true
    }
  },
  {
    paranoid: true,
    freezeTableName: true,
    instanceMethods: {
      getReturnable: function() {
        var self = this;

        var ret = {
          id: self.id,
          name: self.name,
          phone: self.PhoneNumber
        };

        return ret;
      }
    }
  });
};
