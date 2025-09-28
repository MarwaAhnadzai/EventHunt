// backend/eventhunt-node/src/controllers/eventController.js
import { Event } from '../models/Event.js';
import { User } from '../models/User.js';
import { Op } from 'sequelize';

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{
        model: User,
        as: 'organizer',
        attributes: ['id', 'username', 'email']
      }],
      order: [['date', 'ASC']]
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'organizer',
        attributes: ['id', 'username', 'email']
      }]
    });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, maxAttendees } = req.body;
    
    // Get user ID from authenticated user
    const organizerId = req.user.id;
    
    const event = await Event.create({
      title,
      description,
      date,
      location,
      category,
      maxAttendees,
      organizerId
    });
    
    // Include organizer details in response
    const eventWithOrganizer = await Event.findByPk(event.id, {
      include: [{
        model: User,
        as: 'organizer',
        attributes: ['id', 'username', 'email']
      }]
    });
    
    res.status(201).json(eventWithOrganizer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if user is the organizer
    if (event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }
    
    await event.update(req.body);
    
    const updatedEvent = await Event.findByPk(event.id, {
      include: [{
        model: User,
        as: 'organizer',
        attributes: ['id', 'username', 'email']
      }]
    });
    
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if user is the organizer
    if (event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }
    
    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get events by organizer
export const getEventsByOrganizer = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { organizerId: req.params.organizerId },
      include: [{
        model: User,
        as: 'organizer',
        attributes: ['id', 'username', 'email']
      }],
      order: [['date', 'ASC']]
    });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search events
export const searchEvents = async (req, res) => {
  try {
    const { search } = req.query;
    
    if (!search) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const events = await Event.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { location: { [Op.like]: `%${search}%` } },
          { category: { [Op.like]: `%${search}%` } }
        ]
      },
      include: [{
        model: User,
        as: 'organizer',
        attributes: ['id', 'username', 'email']
      }],
      order: [['date', 'ASC']]
    });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};