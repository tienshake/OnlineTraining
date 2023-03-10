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
    }
  }
  User_detail.init(
    {
      user_id: DataTypes.INTEGER,
      phone_number: DataTypes.INTEGER,
      address: DataTypes.STRING,
      about_me: DataTypes.STRING,
      avatar: DataTypes.STRING,
      experience: DataTypes.STRING,
      education: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_detail",
    }
  );
  return User_detail;
};
