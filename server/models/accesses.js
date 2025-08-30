"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Access extends Model {
    static associate(models) {
      Access.hasMany(models.cms_auth, { foreignKey: "accessId" });
    }
  }
  Access.init(
    {
      access: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Access",
      tableName: "accesses", 
    }
  );
  return Access;
};
