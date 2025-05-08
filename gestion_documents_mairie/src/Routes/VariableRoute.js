import { Router } from 'express';
import { VariableController } from '../Controllers/VariableController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const routes = Router();
const controller = new VariableController();

routes.post('/',authenticateToken, controller.create.bind(controller));
routes.get('/',authenticateToken, controller.findAll.bind(controller));
routes.get('/:id', authenticateToken,controller.findByID.bind(controller));
routes.put('/:id',authenticateToken, controller.update.bind(controller));
routes.delete('/:id',authenticateToken, controller.delete.bind(controller));
// routes.get('/template/:templateId', controller.findByTemplate.bind(controller));

export default routes;
