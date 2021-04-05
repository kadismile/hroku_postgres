'use strict';
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      isUnique :true,
      allowNull:false,
      validate:{
        isEmail : true
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpire: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    console.log("user====> ", user)
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.prototype.getSignedJwtToken = function() {
    return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  };

  User.prototype.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  return User;
};