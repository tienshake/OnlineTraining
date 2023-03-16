"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blog_detail.init(
    {
      blog_id: DataTypes.INTEGER,
      total_time: DataTypes.INTEGER,
      total_views: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Blog_detail",
    }
  );
  return Blog_detail;
};
