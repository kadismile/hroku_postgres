'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TodoItem extends Model {
    static associate(models) {
      TodoItem.belongsTo(models.Todo, {
        foreignKey: 'todoId',
        onDelete: 'CASCADE',
      });
    }
  }

  TodoItem.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'TodoItem',
  });
  return TodoItem;
};