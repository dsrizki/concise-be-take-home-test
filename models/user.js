'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.member, {
        foreignKey: 'user_id'
      });
      user.hasMany(models.task, { foreignKey: 'user_id' });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name is required' }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email must be unique'
        },
        validate: {
          notNull: { msg: 'Email is required' },
          notEmpty: { msg: 'Email is required' },
          isEmail: { msg: 'Invalid email format' }
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
          args: true,
          msg: 'Phone number must be unique'
        },
        validate: {
          len: {
            args: [5, 12],
            msg: 'Phone number length must be between 5 to 12'
          }
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'user'
    }
  );
  return user;
};
