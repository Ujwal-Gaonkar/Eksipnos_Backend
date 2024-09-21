import { Request, Response } from 'express';
import Enquiry from '../models/Enquiry';

// Controller function to create a new enquiry
export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, course, message } = req.body;

    // Create a new enquiry
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      course,
      message,
    });

    // Save to database
    const savedEnquiry = await newEnquiry.save();

    // Return response
    return res.status(201).json({
      message: 'Enquiry submitted successfully!',
      enquiry: savedEnquiry,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error submitting enquiry',
      error: (error as Error).message, // Cast error as Error
    });
  }
};

// Controller function to fetch all enquiries (admin only)
export const getAllEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    
    // Return all enquiries
    return res.status(200).json({
      message: 'Enquiries fetched successfully',
      enquiries,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching enquiries',
      error: (error as Error).message, // Cast error as Error
    });
  }
};

// Optional: Controller function to delete an enquiry (admin only)
export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find and delete enquiry by ID
    await Enquiry.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting enquiry',
      error: (error as Error).message, // Cast error as Error
    });
  }
};
