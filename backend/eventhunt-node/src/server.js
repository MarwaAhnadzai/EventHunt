// backend/eventhunt-node/src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory storage for development (remove when database works)
let events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring latest innovations",
    date: "2024-12-15T09:00:00.000Z",
    location: "Convention Center, New York",
    category: "CONFERENCE",
    maxAttendees: 500,
    organizerId: 1
  },
  {
    id: 2,
    title: "Music Festival",
    description: "Summer music festival with popular artists",
    date: "2024-07-20T14:00:00.000Z",
    location: "Central Park, New York",
    category: "MUSIC",
    maxAttendees: 1000,
    organizerId: 2
  }
];

let users = [
  {
    id: 1,
    username: "organizer1",
    email: "organizer1@example.com",
    role: "EVENTHUNT_USER"
  }
];

// Simple authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Simple token validation (replace with JWT in production)
  try {
    req.user = { id: 1, username: "demo-user" }; // Demo user
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Routes

// Get all events
app.get('/api/events', (req, res) => {
  const { search } = req.query;
  
  let filteredEvents = events;
  
  if (search) {
    filteredEvents = events.filter(event => 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json(filteredEvents);
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  res.json(event);
});

// Create event (protected)
app.post('/api/events', authenticateToken, (req, res) => {
  const { title, description, date, location, category, maxAttendees } = req.body;
  
  if (!title || !date || !location || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newEvent = {
    id: events.length + 1,
    title,
    description,
    date,
    location,
    category,
    maxAttendees,
    organizerId: req.user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check if user exists
  if (users.find(u => u.email === email || u.username === username)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    email,
    role: 'EVENTHUNT_USER',
    createdAt: new Date()
  };
  
  users.push(newUser);
  
  // Generate simple token (replace with JWT in production)
  const token = `demo-token-${newUser.id}`;
  
  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: newUser
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  
  // Simple demo authentication (replace with proper auth in production)
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate simple token
  const token = `demo-token-${user.id}`;
  
  res.json({
    message: 'Login successful',
    token,
    user
  });
});

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'EventHunt API is running!',
    version: '1.0.0',
    endpoints: {
      events: '/api/events',
      auth: '/api/auth'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Using in-memory storage (development mode)`);
  console.log(`🔗 API available at http://localhost:${PORT}/api`);
});