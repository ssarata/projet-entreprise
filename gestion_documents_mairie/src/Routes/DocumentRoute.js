import { Router } from 'express';
import { DocumentController } from '../Controllers/DocumentController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const routes = Router();
const controller = new DocumentController();

routes.post('/',authenticateToken, controller.createDocument.bind(controller));
routes.get('/', authenticateToken,controller.getAllDocuments.bind(controller));
routes.get('/:id',authenticateToken, controller.getDocumentById.bind(controller));
routes.put('/:id',authenticateToken, controller.updateDocument.bind(controller));
routes.delete('/:id', authenticateToken,controller.deleteDocument.bind(controller));

export default routes;
