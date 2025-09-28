// src/models/ticketModel.js
// Ticket table for RSVP / Event registration

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Ticket = sequelize.define("Ticket", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  eventId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "CONFIRMED" }
});

export default Ticket;
