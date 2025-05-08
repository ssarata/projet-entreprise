import { Router } from 'express';
import {
    createPersonne,
    getAllPersonnes,
    getPersonneById,
    updatePersonne,
    deletePersonne,
  } from '../Controllers/personne.controller.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = Router();

// Routes pour la table Personne
router.post('/', authenticateToken, createPersonne); // Créer une personne
router.put('/:id', authenticateToken, updatePersonne); // Mettre à jour une personne
router.get('/', getAllPersonnes); // Récupérer toutes les personnes
router.get('/:id', getPersonneById); // Récupérer une personne par ID
router.delete('/:id', authenticateToken, deletePersonne); // Supprimer une personne

export default router;