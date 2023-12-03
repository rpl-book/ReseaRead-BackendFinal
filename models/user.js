"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Library, {
        foreignKey: "userId",
      });

      User.hasMany(models.UserPost, {
        foreignKey: "userId",
      });

      User.hasMany(models.Review, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.CHAR(128),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      userImage: {
        type: DataTypes.BLOB,
        allowNull: false,
        defaultValue: "./images/userImgPlaceholder.png",
      },
    },
    { sequelize, modelName: "User", tableName: "Tbl_User" }
  );

  return User;
};
