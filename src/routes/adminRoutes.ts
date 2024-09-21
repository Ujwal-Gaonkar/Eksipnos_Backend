import { Router } from 'express';
import { getAllUsers,
        updateUserRole,
        deleteUser,
        getUserCount,
        getRecentEnquiries,
        getUserAnalytics  } from '../controllers/adminUserController';

import { protect, admin } from '../middlewares/authMiddleware';

const router = Router();

// Fetch all users (admin only)
router.get('/users', protect, admin, getAllUsers);

// Update user role (admin only)
router.put('/users/:id/role', protect, admin, updateUserRole);

// Delete user (admin only)
router.delete('/users/:id', protect, admin, deleteUser);

// Fetch user count (admin only)
router.get('/user-count', protect, admin, getUserCount);

// Fetch recent enquiries (admin only)
router.get('/recent-enquiries', protect, admin, getRecentEnquiries);

// Fetch user analytics (admin only)
router.get('/user-analytics', protect, admin, getUserAnalytics);

export default router;
