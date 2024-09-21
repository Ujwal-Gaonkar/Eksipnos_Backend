import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { loginSchema } from '../validators/userValidator';
import { generateToken } from '../utils/jwt';

// Login controller
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input using Joi
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Log both the entered password and the stored hashed password for comparison
    console.log('Entered password:', password);
    console.log('Stored hashed password:', user.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    // Log the result of the comparison
    console.log('Password comparison result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id.toString(), user.role);

    console.log('Login successful');

    // Return the token and user info
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
