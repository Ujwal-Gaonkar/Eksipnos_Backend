import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { registerSchema } from '../validators/userValidator';

// Registration controller
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body using Joi
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Log original password
    console.log('Original password before hashing:', password);

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Log the hashed password to ensure it's being hashed only once
    console.log('Hashed password:', hashedPassword);

    // Create a new user and save it in the database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};
