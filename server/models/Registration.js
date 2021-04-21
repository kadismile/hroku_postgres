'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Registration.init({
    email: {
      type: DataTypes.STRING,
      isUnique :true,
      allowNull:false,
      validate:{
        isEmail : true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    ward: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    local_government: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};