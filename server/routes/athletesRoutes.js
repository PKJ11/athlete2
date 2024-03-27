import express from 'express';
import { getAllAthletes, createAthlete, updateAthlete } from '../controllers/athleteController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/', getAllAthletes);
router.post('/', createAthlete);
router.put('/:id', updateAthlete);

export default router;
