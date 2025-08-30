"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cms_auth extends Model {
    static associate(models) {
      // hubungan ke Access
      cms_auth.belongsTo(models.Access, { foreignKey: "accessId" });
    }
  }
  cms_auth.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      accessId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cms_auth",
    }
  );
  return cms_auth;
};
