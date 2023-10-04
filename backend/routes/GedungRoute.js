import express from "express";
import {
    getGedungs,
    getGedungById,
    saveGedung,
    updateGedung,
    deleteGedung,
    acceptBooking
} from "../controllers/Gedungs.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/gedungs',verifyUser, getGedungs);
router.get('/gedungs/:id',verifyUser, getGedungById);
router.post('/gedungs',verifyUser,adminOnly, saveGedung);
router.patch('/gedungs/:id',verifyUser,adminOnly, updateGedung);
router.delete('/gedungs/:id',verifyUser,adminOnly, deleteGedung);
router.post("/bookings/:id/accept",verifyUser,adminOnly, acceptBooking);

export default router;