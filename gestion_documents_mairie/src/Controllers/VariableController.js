
import  VariableService  from '../Services/VariableService.js';
import {
    HTTP_200_OK,
    HTTP_201_CREATE,
    HTTP_500_INTERNAL_SERVER_ERROR
  } from "../Constantes/httpStatus.js";
  
export class VariableController {
  variable;
  constructor() {
    this.variableService = new VariableService();
  }

  async create(req, res) {
    const { nomVariable, templateId } = req.body;

    try {
      const variable = await variableService.createVariable({ nomVariable, templateId });
      res.status(HTTP_201_CREATE).json(variable);
    } catch (error) {
      res.status(HTTP_HTTP_500_INTERNAL_SERVER_ERROR_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la création de la variable' });
    }
  }

  async findAll(req, res) {
    try {
      const variables = await variableService.getAllVariables();
      res.status(HTTP_200_OK).json(variables);
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la récupération des variables' });
    }
  }

  async findByID(req, res) {
    const id = parseInt(req.params.id);
    try {
      const variable = await variableService.getVariableById(id);
      if (!variable) {
        return res.status(404).json({ error: 'Variable non trouvée' });
      }
      res.status(HTTP_200_OK).json(variable);
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la récupération de la variable' });
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const { nomVariable, templateId } = req.body;
    try {
      const variable = await variableService.updateVariable(id, { nomVariable, templateId });
      res.status(HTTP_200_OK).json(variable);
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la mise à jour de la variable' });
    }
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);
    try {
      await variableService.deleteVariable(id);
      res.status(204).send(); // Pas de contenu, suppression réussie
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la suppression de la variable' });
    }
  }

  async findByTemplate(req, res) {
    const templateId = parseInt(req.params.templateId);
    try {
      const variables = await variableService.getVariablesByTemplate(templateId);
      res.status(HTTP_200_OK).json(variables);
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la récupération des variables par template' });
    }
  }
}
