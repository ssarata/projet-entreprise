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
