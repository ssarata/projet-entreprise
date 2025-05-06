import { Router } from 'express';
import upload from '../middlewares/upload.js';
import {
  createMairie,
  getAllMairies,
  getMairieById,
  updateMairie,
  deleteMairie,
} from '../Controllers/mairieController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticateToken,upload.single('logo'), createMairie);
router.put('/:id',authenticateToken, upload.single('logo'), updateMairie); // ← Ajout du middleware ici
router.get('/', getAllMairies);
router.get('/:id', getMairieById);
router.delete('/:id',authenticateToken, deleteMairie);

export default router;
