// backend/eventhunt-node/src/routes/events.js
import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsByOrganizer,
  searchEvents
} from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/search', searchEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', authenticateToken, createEvent);
router.put('/:id', authenticateToken, updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);
router.get('/organizer/:organizerId', authenticateToken, getEventsByOrganizer);

export default router;