
import  VariableService  from '../Services/Variable.service.js';
import {
    HTTP_200_OK,
    HTTP_201_CREATE,
    HTTP_500_INTERNAL_SERVER_ERROR
  } from "../Constantes/httpStatus.js";
  import VariableValidate from '../Validations/VariableValidate.js';
export class VariableController {
  variableService;
  constructor() {
    this.variableService = new VariableService();
  }

  async create(req, res) {
    const data  = req.body;

    try {
      const result=VariableValidate(data);
      result.nomVariable=data.nomVariable
   
      const variable = await  this.variableService.createVariable( result);
      res.status(HTTP_201_CREATE).json(variable);
    } catch (error) {
      console.log(error);
      
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const variables = await  this.variableService.getAllVariables();
      res.status(HTTP_200_OK).json(variables);
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message});
    }
  }

  async findByID(req, res) {
    const id = parseInt(req.params.id);
    try {
      const variable = await this.variableService.getVariableById(id);
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
    const data = req.body;
    try {
      const result=VariableValidate(data);
      result.nomVariable=data.nomVariable
   
      const variable = await this.variableService.updateVariable(id, result);
      res.status(HTTP_200_OK).json(variable);
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error:  error.message });
    }
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);
    try {
      await this.variableService.deleteVariable(id);
      res.status(204).send(); // Pas de contenu, suppression réussie
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la suppression de la variable' });
    }
  }

  // async findByTemplate(req, res) {
  //   const templateId = parseInt(req.params.templateId);
  //   try {
  //     const variables = await this.variableService.getVariablesByTemplate(templateId);
  //     res.status(HTTP_200_OK).json(variables);
  //   } catch (error) {
  //     res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la récupération des variables par template' });
  //   }
  // }
}
