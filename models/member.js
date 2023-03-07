'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    static associate(models) {
      member.belongsTo(models.group, { foreignKey: 'member_id' });
      member.belongsTo(models.user, { foreignKey: 'user_id' });
    }
  }
  member.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'group_id is required' },
          notEmpty: { msg: 'group_id is required' }
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
      modelName: 'member'
    }
  );
  return member;
};
