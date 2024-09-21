import { Request, Response } from 'express';
import User from '../models/User';
import Enquiry from '../models/Enquiry'; // Assuming you have an Enquiry model

// Get all users (Admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: (error as Error).message, // Casting error as Error
    });
  }
};

// Update user role (Admin only)
export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.role = role;
    await user.save();
    return res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update user role',
      error: (error as Error).message, // Casting error as Error
    });
  }
};

// Delete a user (Admin only)
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: (error as Error).message, // Casting error as Error
    });
  }
};

// Get user count
export const getUserCount = async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments();
    return res.status(200).json({ success: true, count: userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch user count', error: (error as Error).message });
  }
};

// Get recent enquiries (Admin only)
export const getRecentEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(10); // Modify the limit as per your need
    return res.status(200).json({ success: true, enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries',
      error: (error as Error).message, // Casting error as Error
    });
  }
};

// Get user analytics (e.g., total users, admins, users)
export const getUserAnalytics = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const userCount = await User.countDocuments({ role: 'user' });
    return res.status(200).json({
      success: true,
      analytics: {
        totalUsers,
        adminCount,
        userCount,
      },
    });
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user analytics',
      error: (error as Error).message, // Casting error as Error
    });
  }
};
