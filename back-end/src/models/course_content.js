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
      title: DataTypes.STRING,
      course_id: DataTypes.INTEGER,
      video: DataTypes.TEXT("long"),
      document: DataTypes.STRING,
      exercise: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course_content",
    }
  );
  return Course_content;
};
