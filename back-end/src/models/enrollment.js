"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enrollment.hasMany(models.Payment, {
        foreignKey: "enrollment_id",
      });

      Enrollment.belongsTo(models.Course, {
        foreignKey: "course_id",
      });
    }
  }
  Enrollment.init(
    {
      user_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      // payment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Enrollment",
    }
  );
  return Enrollment;
};
