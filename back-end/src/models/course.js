"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association hererrr
      Course.hasMany(models.Course_section, {
        foreignKey: "course_id",
        as: "course_sections",
      });

      Course.hasOne(models.Course_detail, {
        foreignKey: "course_id",
        as: "course_detail",
      });

      Course.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Course.hasMany(models.Rating, {
        foreignKey: "course_id",
        // as: "average_rating",
      });

      Course.hasMany(models.Enrollment, {
        foreignKey: "course_id",
        // as: "average_rating",
      });

      Course.hasMany(models.Payment, {
        foreignKey: "course_id",
      });
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      price: DataTypes.INTEGER,
      promotion_price: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
