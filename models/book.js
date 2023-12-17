"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.Library, {
        foreignKey: "bookId",
      });

      Book.hasMany(models.Review, {
        foreignKey: "bookId",
      });
    }
  }
  Book.init(
    {
      bookId: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.CHAR(50),
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      page: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Book", tableName: "Tbl_Book" }
  );

  return Book;
};
