'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    static associate(models) {
      group.hasMany(models.member, { foreignKey: 'group_id' });
    }
  }
  group.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name is required' }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'group'
    }
  );
  return group;
};
