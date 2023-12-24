"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserPost extends Model {
    static associate(models) {
      UserPost.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  UserPost.init(
    {
      postId: {
        type: DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      postImage: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      postDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { sequelize, modelName: "UserPost", tableName: "Tbl_UserPost" }
  );

  return UserPost;
};
