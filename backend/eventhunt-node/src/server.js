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

// Import database and models
import { sequelize, testConnection } from './config/database.js';
import { User } from './models/User.js';
import { Event } from './models/Event.js';
import { Ticket } from './models/Ticket.js';
import setupAssociations from './controllers/associations.js';

// Import routes
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import userRoutes from './routes/users.js';
import ticketRoutes from './routes/ticket.js';

// Test database connection on startup
const initializeDatabase = async () => {
  console.log('🔄 Attempting to connect to PostgreSQL database...');
  console.log(`📊 Database: ${process.env.DB_NAME}`);
  console.log(`👤 User: ${process.env.DB_USER}`);
  console.log(`🌐 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  
  const connected = await testConnection();
  
  if (connected) {
    try {
      // Setup model associations
      setupAssociations();
      
      // Sync all models with database
      await sequelize.sync({ force: false }); // Use { force: true } only in development to reset tables
      console.log('✅ Database synced successfully');
    } catch (error) {
      console.error('❌ Database sync failed:', error.message);
    }
  } else {
    console.log('🚨 Starting server with in-memory storage (database not available)');
    // You can add your in-memory fallback here if needed
  }
};

// Initialize database
initializeDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'EventHunt API is running!',
    version: '1.0.0',
    database: 'PostgreSQL',
    endpoints: {
      events: '/api/events',
      auth: '/api/auth',
      users: '/api/users',
      tickets: '/api/tickets'
    }
  });
});

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ 
      status: 'OK', 
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      database: 'Disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});