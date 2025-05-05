
import {
    HTTP_200_OK,
    HTTP_201_CREATE,
    HTTP_500_INTERNAL_SERVER_ERROR
  } from "../Constantes/httpStatus.js";
import DocumentTemplateService from "../Services/DocumentTemplateService.js";
  import TemplateValidate from '../Validations/TemplateValidate.js';
export class DocumentTemplateController {
 templateService ;
  constructor() {
    this.templateService = new DocumentTemplateService();
  }

  async create(req, res) {
    const data  = req.body;

    try {
      const result=TemplateValidate(data);
      result.typeDocument=data.typeDocument
   
      const template = await  this.templateService.createtemplate( result);
      res.status(HTTP_201_CREATE).json(template);
    } catch (error) {
      console.log(error);
      
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
  async createtemplate(req, res) {
    console.log(req.params);
    const { variableId, documentTemplateId } = req.params;
  
    try {
      // Vérification des paramètres requis
      if (!variableId || !documentTemplateId) {
        return res.status(400).json({
          error: "Les champs variableId et documentTemplateId sont requis",
        });
      }
  
      const data = {
        variableId: parseInt(variableId, 10),
        documentTemplateId: parseInt(documentTemplateId, 10),
      };
  
      const template = await this.templateService.createtemplateVariable(data);
  
      res.status(HTTP_201_CREATE).json(template);
    } catch (error) {
      console.error("Erreur lors de la création du lien variable-template :", error);
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
  
  async findAll(req, res) {
    try {
      const templates = await  this.templateService.getAlltemplates();
      res.status(HTTP_200_OK).json(templates);
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message});
    }
  }
  async findByID(req, res) {
    const id = parseInt(req.params.id);
    try {
      const template = await  this.templateService.getTemplateById(id);
      if (!template) {
        return res.status(404).json({ error: 'Template non trouvé' });
      }
      res.status(200).json(template);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération du template' });
    }
  }
  

  async update(req, res) {
    const id = parseInt(req.params.id);
    const data = req.body;
    try {
      const result=TemplateValidate(data);
      result.typeDocument=data.typeDocument
   
      const template = await this.templateService.updatetemplate(id, result);
      res.status(HTTP_200_OK).json(template);
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error:  error.message });
    }
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);
    try {
      await this.templateService.deletetemplate(id);
      res.status(204).send(); // Pas de contenu, suppression réussie
    } catch (error) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la suppression de la template' });
    }
  }


}
