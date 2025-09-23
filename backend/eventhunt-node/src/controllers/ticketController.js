// src/controllers/ticketController.js
// Handles RSVP / Ticket registration

import Ticket from "../models/ticketModel.js";

// RSVP to an event
export const rsvpEvent = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const eventId = req.params.id;

    const ticket = await Ticket.create({ userId, eventId, status: "CONFIRMED" });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tickets of the logged-in user
export const getUserTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await Ticket.findAll({ where: { userId } });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
