import express from "express";
import {
    getEkstrakurikulers,
    getEkstrakurikulerById,
    saveEkstrakurikuler,
    updateEkstrakurikuler,
    deleteEkstrakurikuler
} from "../controllers/Ekstrakurikulers.js";

const router = express.Router();

router.get('/ekstrakurikulers', getEkstrakurikulers);
router.get('/ekstrakurikulers/:id', getEkstrakurikulerById);
router.post('/ekstrakurikulers', saveEkstrakurikuler);
router.patch('/ekstrakurikulers/:id', updateEkstrakurikuler);
router.delete('/ekstrakurikulers/:id', deleteEkstrakurikuler);

export default router;