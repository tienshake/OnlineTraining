"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      // description: {
      //   type: Sequelize.TEXT("long"),
      // },
      // descriptionMarkdown: {
      //   type: Sequelize.TEXT("long"),
      // },
      thumbnail: {
        type: Sequelize.BLOB("long"),
      },
      price: {
        type: Sequelize.INTEGER,
      },
      promotion_price: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Courses");
  },
};
