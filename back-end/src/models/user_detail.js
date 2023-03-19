"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_detail.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user_details",
      });
    }
  }
  User_detail.init(
    {
      user_id: DataTypes.INTEGER,
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
      about_me: DataTypes.TEXT("long"),
      avatar: DataTypes.STRING,
      experience: DataTypes.STRING,
      education: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_detail",
    }
  );
  return User_detail;
};
