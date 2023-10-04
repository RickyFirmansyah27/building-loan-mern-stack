import express from 'express';
import {
  getBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/Bookings.js';

const router = express.Router();

router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);
router.post('/bookings', addBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

export default router;
