"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    static associate(models) {
      Library.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Library.belongsTo(models.Book, {
        foreignKey: "bookId",
      });
    }
  }
  Library.init(
    {
      libraryId: {
        type: DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true,
      },

      readStatus: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      dateAdded: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      pageProgress: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { sequelize, modelName: "Library", tableName: "Tbl_Library" }
  );

  return Library;
};