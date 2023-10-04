import express from "express";
import { 
    generateRekBookingReport
} from "../controllers/ReportController.js";

const router = express.Router();

// Endpoint to get report data from rekbookings
router.get('/reports/rekbookings', generateRekBookingReport);

export default router;