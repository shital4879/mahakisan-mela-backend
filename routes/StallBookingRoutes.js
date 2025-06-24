import express from 'express';
import {
  createStallBooking,
  getAllStallBookings,
  getStallBookingById,
  updateStallBooking,
  deleteStallBooking
} from '../controllers/StallBookingController.js';

const router = express.Router();

router.post('/', createStallBooking);
router.get('/stall-bookings', getAllStallBookings);
router.get('/stall-bookings/:id', getStallBookingById);
router.put('/stall-bookings/:id', updateStallBooking);
router.delete('/stall-bookings/:id', deleteStallBooking);

export default router;
