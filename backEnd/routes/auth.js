import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User.js';
import Role from '../models/Role.js';
import auth from '../middleware/auth.js';

const router = express.Router();

async function getRoleIdByName(roleName) {
  const role = await Role.findOne({ name: roleName });
  if (!role) throw new Error(`Role ${roleName} not found`);
  return role._id;
}

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
      });

      res.redirect('http://localhost:5173/home');
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error during Google authentication' 
      });
    }
  }
);

router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      fullName,
      userType,
      companyName,
      registrationNumber,
      contactPerson,
      phoneNumber,
    } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (userType === 'company' && (!companyName || !registrationNumber || !contactPerson)) {
      return res.status(400).json({ 
        message: 'Company details are required for company registration' 
      });
    }

    const roleId = await getRoleIdByName('user');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      email,
      password: hashedPassword,
      fullName,
      userType,
      phoneNumber,
      roleId,
      createdAt: new Date()
    };

    if (userType === 'company') {
      userData.companyName = companyName;
      userData.registrationNumber = registrationNumber;
      userData.contactPerson = contactPerson;
    }

    user = new User(userData);
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({ 
      message: 'User created successfully',
      user: {
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({ 
      message: 'Login successful',
      user: {
        email: user.email,
        fullName: user.fullName,
        userType: user.userType
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.post('/logout', auth, (req, res) => {
  console.log('Token from request:', req.cookies.token); // Debug log
  
  if (!req.cookies.token) {
    return res.status(401).json({
      success: false,
      message: 'No active session found'
    });
  }

  res.clearCookie('token');
  res.json({ 
    success: true,
    message: 'Logged out successfully' 
  });
});

export default router;