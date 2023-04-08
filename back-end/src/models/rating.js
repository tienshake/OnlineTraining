"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });

      Rating.belongsTo(models.Course, {
        foreignKey: "course_id",
        // as: "average_rating",
      });
    }
  }
  Rating.init(
    {
      user_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      parent_id: DataTypes.INTEGER,
      rating_value: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
