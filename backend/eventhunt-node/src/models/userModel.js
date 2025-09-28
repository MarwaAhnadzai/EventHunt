// src/models/userModel.js - Enhanced
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    validate: {
      len: [3, 30]
    }
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      len: [6, 100]
    }
  },
  role: { 
    type: DataTypes.ENUM('EVENTHUNT_USER', 'ORGANIZER', 'ADMIN'), 
    defaultValue: "EVENTHUNT_USER" 
  },
  profileImage: { type: DataTypes.STRING, allowNull: true },
  bio: { type: DataTypes.TEXT, allowNull: true }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

export default User;