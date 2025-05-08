import { Router } from 'express';
import { DocumentController } from '../Controllers/DocumentController.js';

const routes = Router();
const controller = new DocumentController();

routes.post('/', controller.createDocument.bind(controller));
routes.get('/', controller.getAllDocuments.bind(controller));
routes.get('/:id', controller.getDocumentById.bind(controller));
routes.put('/:id', controller.updateDocument.bind(controller));
routes.delete('/:id', controller.deleteDocument.bind(controller));

export default routes;
