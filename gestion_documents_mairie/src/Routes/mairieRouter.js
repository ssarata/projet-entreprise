import { Router } from 'express';
import upload from '../middlewares/upload.js';
import {
  createMairie,
  getAllMairies,
  getMairieById,
  updateMairie,
  deleteMairie,
} from '../Controllers/mairieController.js';

const router = Router();

router.post('/', upload.single('logo'), createMairie);
router.put('/:id', upload.single('logo'), updateMairie); // ← Ajout du middleware ici
router.get('/', getAllMairies);
router.get('/:id', getMairieById);
router.delete('/:id', deleteMairie);

export default router;
