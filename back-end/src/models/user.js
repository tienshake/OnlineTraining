"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Rating, {
        foreignKey: "user_id",
        as: "users",
      });

      User.hasMany(models.User_detail, {
        foreignKey: "user_id",
        as: "user_details",
      });

      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });

      User.hasMany(models.Course, {
        foreignKey: "user_id",
        as: "user",
      });

      User.hasMany(models.Payment, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      role_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
