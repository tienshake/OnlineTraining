"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course_section.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course_sections",
      });

      Course_section.hasMany(models.Lecture, {
        foreignKey: "course_section_id",
        as: "lectures",
      });
    }
  }
  Course_section.init(
    {
      title: DataTypes.STRING,
      course_id: DataTypes.INTEGER,
      // video: DataTypes.TEXT("long"),
      // document: DataTypes.STRING,
      // exercise: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course_section",
    }
  );
  return Course_section;
};
