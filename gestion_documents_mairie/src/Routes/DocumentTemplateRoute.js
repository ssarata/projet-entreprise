import { Router } from 'express';
import { DocumentTemplateController } from '../Controllers/DocumentTemplateController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const routes = Router();
const controller = new DocumentTemplateController();

routes.post('/', authenticateToken,controller.create.bind(controller));
routes.post('/:variableId/:documentTemplateId', authenticateToken,controller.createtemplate.bind(controller));
routes.get('/',authenticateToken, controller.findAll.bind(controller));
routes.get('/:id', authenticateToken,controller.findByID.bind(controller));
routes.put('/:id',authenticateToken, controller.update.bind(controller));
routes.delete('/:id',authenticateToken, controller.delete.bind(controller));

export default routes;

/**
 * @swagger
 * tags:
 *   name: DocumentTemplates
 *   description: Gestion des modèles de documents
 */

/**
 * @swagger
 * /document-templates:
 *   post:
 *     summary: Crée un nouveau modèle de document
 *     tags: [DocumentTemplates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeDocument:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Modèle de document créé avec succès
 *       400:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /document-templates/{variableId}/{documentTemplateId}:
 *   post:
 *     summary: Associe une variable à un modèle de document
 *     tags: [DocumentTemplates]
 *     parameters:
 *       - in: path
 *         name: variableId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la variable
 *       - in: path
 *         name: documentTemplateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du modèle de document
 *     responses:
 *       201:
 *         description: Association créée avec succès
 *       400:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /document-templates:
 *   get:
 *     summary: Récupère tous les modèles de documents
 *     tags: [DocumentTemplates]
 *     responses:
 *       200:
 *         description: Liste des modèles de documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   typeDocument:
 *                     type: string
 *                   content:
 *                     type: string
 */

/**
 * @swagger
 * /document-templates/{id}:
 *   get:
 *     summary: Récupère un modèle de document par ID
 *     tags: [DocumentTemplates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du modèle de document
 *     responses:
 *       200:
 *         description: Détails du modèle de document
 *       404:
 *         description: Modèle de document non trouvé
 */

/**
 * @swagger
 * /document-templates/{id}:
 *   put:
 *     summary: Met à jour un modèle de document
 *     tags: [DocumentTemplates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du modèle de document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeDocument:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Modèle de document mis à jour avec succès
 *       404:
 *         description: Modèle de document non trouvé
 */

/**
 * @swagger
 * /document-templates/{id}:
 *   delete:
 *     summary: Supprime un modèle de document
 *     tags: [DocumentTemplates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du modèle de document
 *     responses:
 *       204:
 *         description: Modèle de document supprimé avec succès
 *       404:
 *         description: Modèle de document non trouvé
 */