// src/routes/ticket.js
import express from "express";
import { rsvpEvent, getUserTickets } from "../controllers/ticketController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/rsvp", authenticateToken, rsvpEvent);  // RSVP to an event
router.get("/me", authenticateToken, getUserTickets);    // View my tickets

export default router;
