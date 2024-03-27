import express from 'express';
import { getSponsors, createSponsor, updateSponsor } from '../controllers/SponsorsController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/', getSponsors);
router.post('/', createSponsor);
router.put('/:id', updateSponsor);

export default router;
