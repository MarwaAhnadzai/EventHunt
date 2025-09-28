// backend/eventhunt-node/src/controllers/userController.js
import { User } from '../models/User.js';

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] } // Don't return password
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user is updating their own profile
    if (user.id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }
    
    const { username, email } = req.body;
    
    // Check if username or email already exists (excluding current user)
    if (username) {
      const existingUser = await User.findOne({ 
        where: { 
          username, 
          id: { [Op.ne]: user.id } 
        } 
      });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }
    
    if (email) {
      const existingUser = await User.findOne({ 
        where: { 
          email, 
          id: { [Op.ne]: user.id } 
        } 
      });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
    }
    
    await user.update(req.body);
    
    // Return user without password
    const updatedUser = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] }
    });
    
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user account
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user is deleting their own account
    if (user.id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this account' });
    }
    
    await user.destroy();
    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};