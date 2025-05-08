import express from 'express';
import * as personneController from '../Controllers/personne.controller.js';
import * as personneMiddleware from '../middlewares/personne.middleware.js';

const router = express.Router();

router.post('/', personneMiddleware.validatePersonneData, personneController.createPersonne);
router.get('/', personneController.getAllPersonnes);
router.get('/:id', personneController.getPersonneById);
router.put('/:id', personneMiddleware.validatePersonneData, personneController.updatePersonne);
router.delete('/:id', personneController.deletePersonne);

export default router;