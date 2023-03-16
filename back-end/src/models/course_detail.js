"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course_content.init(
    {
      course_id:      DataTypes.INTEGER,
      total_chapter:  DataTypes.INTEGER,
      total_lectures: DataTypes.INTEGER,
      total_time:     DataTypes.INTEGER,
      promotion_price:DataTypes.INTEGER,
      thumbnail:      DataTypes.STRING,
      total_view:     DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Course_content",
    }
  );
  return Course_content;
};
