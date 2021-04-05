'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.hasMany(models.TodoItem, {
        foreignKey: 'todoId',
        as: 'todoItems',
      });
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};