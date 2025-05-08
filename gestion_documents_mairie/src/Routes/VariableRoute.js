import { Router } from 'express';
import { VariableController } from '../Controllers/VariableController.js';

const routes = Router();
const controller = new VariableController();

routes.post('/', controller.create.bind(controller));
routes.get('/', controller.findAll.bind(controller));
routes.get('/:id', controller.findByID.bind(controller));
routes.put('/:id', controller.update.bind(controller));
routes.delete('/:id', controller.delete.bind(controller));
// routes.get('/template/:templateId', controller.findByTemplate.bind(controller));

export default routes;

/**
 * @swagger
 * tags:
 *   name: Variables
 *   description: Gestion des variables
 */

/**
 * @swagger
 * /variables:
 *   post:
 *     summary: Crée une nouvelle variable
 *     tags: [Variables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomVariable:
 *                 type: string
 *     responses:
 *       201:
 *         description: Variable créée avec succès
 *       400:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /variables:
 *   get:
 *     summary: Récupère toutes les variables
 *     tags: [Variables]
 *     responses:
 *       200:
 *         description: Liste des variables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nomVariable:
 *                     type: string
 */

/**
 * @swagger
 * /variables/{id}:
 *   get:
 *     summary: Récupère une variable par ID
 *     tags: [Variables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la variable
 *     responses:
 *       200:
 *         description: Détails de la variable
 *       404:
 *         description: Variable non trouvée
 */

/**
 * @swagger
 * /variables/{id}:
 *   put:
 *     summary: Met à jour une variable
 *     tags: [Variables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la variable
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomVariable:
 *                 type: string
 *     responses:
 *       200:
 *         description: Variable mise à jour avec succès
 *       404:
 *         description: Variable non trouvée
 */

/**
 * @swagger
 * /variables/{id}:
 *   delete:
 *     summary: Supprime une variable
 *     tags: [Variables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la variable
 *     responses:
 *       204:
 *         description: Variable supprimée avec succès
 *       404:
 *         description: Variable non trouvée
 */
