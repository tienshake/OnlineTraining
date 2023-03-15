"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {

    static associate(models) {
    }
  }
  Rating.init(
    {
      user_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      parent_id: DataTypes.INTEGER,
      rating_value: DataTypes.INTEGER,
      comment: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};