import express from 'express';
import { DocumentPersonneController } from '../Controllers/DocumentPersonneController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const routes = express.Router();
const controller = new DocumentPersonneController();
routes.post('/',authenticateToken, controller.create.bind(controller));
routes.get('/',authenticateToken, controller.findAll.bind(controller));
routes.get('/:id', authenticateToken,controller.findById.bind(controller));
routes.put('/:id',authenticateToken, controller.update.bind(controller));
routes.delete('/:id',authenticateToken, controller.delete.bind(controller));
// routes.get('/template/:templateId', controller.findByTemplate.bind(controller));


export default routes;