const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.NAME_DB, "root", null, {
  host: "localhost",
  dialect: "mysql",
  // password: process.env.PASSWORD_DB,
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;

// {
//   "development": {
//     "username": "b4c4ddcb80c6ba",
//     "password": "0f36edd8",
//     "database": "heroku_1a359c74148c14d",
//     "host": "us-cdbr-east-06.cleardb.net",
//     "dialect": "mysql",
//     "logging": false,
//     "timezone": "+07:00"
//   }
// }
