// backend/eventhunt-node/src/models/Event.js
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
    type: DataTypes.STRING,
    allowNull: false
  },
  maxAttendees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  organizerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'events',
  timestamps: true
});

export default Event;