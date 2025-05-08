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
