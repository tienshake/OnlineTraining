"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Course_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      course_id: {
        type: Sequelize.INTEGER,
      },
      total_chapter: {
        type: Sequelize.INTEGER,
      },
      total_lectures: {
        type: Sequelize.INTEGER,
      },
      total_time: {
        type: Sequelize.INTEGER,
      },
      promotion_price: {
        type: Sequelize.INTEGER,
      },
      thumbnail: {
        type: Sequelize.BLOB("long"),
      },
      total_view: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT("long"),
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
    await queryInterface.dropTable("Course_details");
  },
};
