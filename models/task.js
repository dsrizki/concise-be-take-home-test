'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    static associate(models) {
      task.belongsTo(models.user, { foreignKey: 'user_id' });
    }
  }
  task.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name is required' }
        }
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name is required' },
          isDate: { msg: 'Invalid date format' }
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'user_id is required' },
          notEmpty: { msg: 'user_id is required' }
        }
      }
    },
    {
      sequelize,
      modelName: 'task'
    }
  );
  return task;
};
