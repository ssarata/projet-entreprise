import { Router } from 'express';
import { DocumentTemplateController } from '../Controllers/DocumentTemplateController.js';

const routes = Router();
const controller = new DocumentTemplateController();

routes.post('/', controller.create.bind(controller));
routes.post('/:variableId/:documentTemplateId', controller.createtemplate.bind(controller));
routes.get('/', controller.findAll.bind(controller));
routes.get('/:id', controller.findByID.bind(controller));
routes.put('/:id', controller.update.bind(controller));
routes.delete('/:id', controller.delete.bind(controller));

export default routes;
