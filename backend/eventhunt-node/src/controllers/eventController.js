// src/controllers/eventController.js
// Handles event creation and fetching

import Event from "../models/eventModel.js";

// Create a new event (only logged-in users)
export const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const userId = req.user.id; // from JWT

    const event = await Event.create({ title, description, date, organizerId: userId });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all events (public)
export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
