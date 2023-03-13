"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Professional_skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Professional_skill.init(
    {
      user_id: DataTypes.INTEGER,
      Professional_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Professional_skill",
    }
  );
  return Professional_skill;
};
