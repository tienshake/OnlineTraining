"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Enrollment, {
        foreignKey: "enrollment_id",
      });

      Payment.belongsTo(models.Course, {
        foreignKey: "course_id",
      });

      Payment.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Payment.init(
    {
      user_id: DataTypes.INTEGER,
      create_user_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      oderId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      status: DataTypes.STRING,
      enrollment_id: DataTypes.INTEGER,
      email_address: DataTypes.STRING,
      nameOder: DataTypes.STRING,
      currency_code: DataTypes.STRING,
      description: DataTypes.STRING,
      create_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
