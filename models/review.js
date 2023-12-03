"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Review.belongsTo(models.Book, {
        foreignKey: "bookId",
      });
    }
  }
  Review.init(
    {
      reviewId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },

      reviewText: {
        type: DataTypes.TEXT, // Correct data type for a text field
        allowNull: false,
      },

      dateAdded: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Review", tableName: "Tbl_Review" }
  );

  return Review;
};
