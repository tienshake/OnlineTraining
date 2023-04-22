"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      course_id: {
        type: Sequelize.INTEGER,
      },
      create_user_id: {
        type: Sequelize.INTEGER,
      },
      oderId: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      enrollment_id: {
        type: Sequelize.INTEGER,
      },
      enrollment_id: {
        type: Sequelize.INTEGER,
      },
      email_address: {
        type: Sequelize.STRING,
      },
      nameOder: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      currency_code: {
        type: Sequelize.STRING,
      },
      create_time: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Payments");
  },
};
