import express from "express";
import {
    getEkskuls,
    getEkskulById,
    createEkskul,
    updateEkskul,
    deleteEkskul
} from "../controllers/Ekskuls.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// router.get('/ekskuls', getEkskuls);
// router.get('/ekskuls/:id', getEkskulById);
// router.post('/ekskuls', createEkskul);
// router.patch('/ekskuls/:id', updateEkskul);
// router.delete('/ekskuls/:id', deleteEkskul);

router.get('/ekskuls',verifyUser, getEkskuls);
router.get('/ekskuls/:id',verifyUser, getEkskulById);
router.post('/ekskuls',verifyUser, createEkskul);
router.patch('/ekskuls/:id',verifyUser, updateEkskul);
router.delete('/ekskuls/:id',verifyUser, deleteEkskul);

export default router;