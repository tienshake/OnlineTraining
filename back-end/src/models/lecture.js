"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association hererrr
      Lecture.belongsTo(models.Course_section, {
        foreignKey: "course_section_id",
      });
    }
  }
  Lecture.init(
    {
      course_section_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      video: DataTypes.TEXT("long"),
      document: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Lecture",
    }
  );
  return Lecture;
};
