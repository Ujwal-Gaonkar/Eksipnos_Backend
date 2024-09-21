import { Router } from 'express';
import { createEnquiry, getAllEnquiries, deleteEnquiry } from '../controllers/enquiryController';
import { protect, admin } from '../middlewares/authMiddleware'; // Import the protect and admin middlewares

const router = Router();

// Route to submit a new enquiry (public)
router.post('/', createEnquiry);

// Route to fetch all enquiries (admin only)
router.get('/', protect, admin, getAllEnquiries);

// Route to delete an enquiry (admin only)
router.delete('/:id', protect, admin, deleteEnquiry);

export default router;
