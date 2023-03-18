"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nofitication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nofitication.init(
    {
      course_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      nofitication_title: DataTypes.STRING,
      nofitication_content: DataTypes.STRING,
      nofitication_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Nofitication",
    }
  );
  return Nofitication;
};
