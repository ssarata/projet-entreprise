const express = require('express');
const router = express.Router();
const personneController = require('../controllers/personne.controller');
const personneMiddleware = require('../middlewares/personne.middleware');

router.post('/', personneMiddleware.validatePersonneData, personneController.createPersonne);
router.get('/', personneController.getAllPersonnes);
router.get('/:id', personneController.getPersonneById);
router.put('/:id', personneMiddleware.validatePersonneData, personneController.updatePersonne);
router.delete('/:id', personneController.deletePersonne);

module.exports = router;