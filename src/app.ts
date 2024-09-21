import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes'; 
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';  
import enquiryRoutes from './routes/enquiryRoutes';
import adminRoutes from './routes/adminRoutes';
  

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors({
  origin: 'http://localhost:3000', // Adjust with your frontend URL
  credentials: true,
}));

app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/enquiries', enquiryRoutes);
// Admin user management 
app.use('/api/admin', adminRoutes);


// Test Route
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Test route works' });
});


// Error Handling Middleware
app.use(errorHandler);  // Use the error handler

// Default fallback port if process.env.PORT is not set
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
