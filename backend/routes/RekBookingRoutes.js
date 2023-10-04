import express from "express";
import {
    createRekBooking,
    deleteRekBooking,
    getRekBookingData
} from "../controllers/RekBookingCon.js";

const router = express.Router();

router.get('/rekbookings', getRekBookingData);
router.post('/rekbookings', createRekBooking);
router.delete('/rekbookings/:id',deleteRekBooking);

export default router;