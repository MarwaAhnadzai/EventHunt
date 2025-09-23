// src/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create Sequelize instance (NOT pg Client)
const sequelize = new Sequelize(
  process.env.DB_NAME,        // database name
  process.env.DB_USER,        // username
  process.env.DB_PASSWORD,    // password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,           // set true if you want SQL logs
  }
);

export default sequelize;
