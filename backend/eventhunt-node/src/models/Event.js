import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('CONFERENCE', 'MUSIC', 'WORKSHOP', 'SPORTS', 'ART', 'OTHER'),
    allowNull: false
  },
  maxAttendees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  organizerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'events',
  timestamps: true
});