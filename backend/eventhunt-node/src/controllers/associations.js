// backend/eventhunt-node/src/controllers/associations.js
import { Event } from '../models/Event.js';
import { User } from '../models/User.js';
import { Ticket } from '../models/Ticket.js';

// Define associations
export const setupAssociations = () => {
  // User has many Events (as organizer)
  User.hasMany(Event, {
    foreignKey: 'organizerId',
    as: 'organizedEvents'
  });
  
  // Event belongs to User (organizer)
  Event.belongsTo(User, {
    foreignKey: 'organizerId',
    as: 'organizer'
  });
  
  // User has many Tickets
  User.hasMany(Ticket, {
    foreignKey: 'userId',
    as: 'tickets'
  });
  
  // Event has many Tickets
  Event.hasMany(Ticket, {
    foreignKey: 'eventId',
    as: 'tickets'
  });
  
  // Ticket belongs to User
  Ticket.belongsTo(User, {
    foreignKey: 'userId',
    as: 'attendee'
  });
  
  // Ticket belongs to Event
  Ticket.belongsTo(Event, {
    foreignKey: 'eventId',
    as: 'event'
  });
};

export default setupAssociations;