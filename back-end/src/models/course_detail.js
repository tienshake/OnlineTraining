"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course_detail.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course_detail",
      });
    }
  }
  Course_detail.init(
    {
      course_id: DataTypes.INTEGER,
      total_chapter: DataTypes.INTEGER,
      total_lectures: DataTypes.INTEGER,
      total_time: DataTypes.INTEGER,
      promotion_price: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      total_view: DataTypes.INTEGER,
      description: DataTypes.TEXT("long"),
      descriptionMarkdown: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Course_detail",
    }
  );
  return Course_detail;
};
