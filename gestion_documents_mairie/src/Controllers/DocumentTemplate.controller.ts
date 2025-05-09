import {
  HTTP_200_OK,
  HTTP_201_CREATE,
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_404_NOT_FOUND,
} from "../Constantes/httpStatus";
import DocumentTemplateService from "../Services/DocumentTemplate.service";
import TemplateValidate from "../Validations/TemplateValidate";
import { Request, Response } from "express";

export class DocumentTemplateController {
  private templateService: DocumentTemplateService;

  constructor() {
    this.templateService = new DocumentTemplateService();
  }

  // Créer un nouveau template
  async create(req: Request, res: Response): Promise<void> {
  try {
    // Validation des données
    const result = TemplateValidate(req.body);

    // Appel du service pour créer le template
    const template = await this.templateService.createTemplate(result as { content: string; typeDocument: string });

    // Réponse HTTP 201 avec le template créé
    res.status(HTTP_201_CREATE).json(template);
  } catch (error: any) {
    // Gestion des erreurs
    console.error(error);
    res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

  // Créer un lien entre une variable et un template
  async createTemplateVariable(req: Request, res: Response): Promise<void> {
    const { variableId, documentTemplateId } = req.params;

    try {
      if (!variableId || !documentTemplateId) {
        res.status(400).json({
          error: "Les champs variableId et documentTemplateId sont requis",
        });
        return;
      }

      const data = {
        variableId: parseInt(variableId, 10),
        documentTemplateId: parseInt(documentTemplateId, 10),
      };

      const template = await this.templateService.createTemplateVariable(data);

      res.status(HTTP_201_CREATE).json(template);
    } catch (error: any) {
      console.error(
        "Erreur lors de la création du lien variable-template :",
        error
      );
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  // Récupérer tous les templates
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const templates = await this.templateService.getAllTemplates();
      res.status(HTTP_200_OK).json(templates);
    } catch (error: any) {
      res
        .status(HTTP_500_INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  // Récupérer un template par ID
  async findByID(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const template = await this.templateService.getTemplateById(id);
      if (!template) {
        res.status(HTTP_404_NOT_FOUND).json({ error: "Template non trouvé" });
        return;
      }
      res.status(HTTP_200_OK).json(template);
    } catch (error: any) {
      console.error(error);
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({
        error: "Erreur lors de la récupération du template",
      });
    }
  }

  // Mettre à jour un template
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    try {
      const result = TemplateValidate(data);
      result.typeDocument = data.typeDocument;

      const template = await this.templateService.updateTemplate(id, result);
      res.status(HTTP_200_OK).json(template);
    } catch (error: any) {
      res
        .status(HTTP_500_INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  // Supprimer un template
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const deleted = await this.templateService.deleteTemplate(id);
      if (!deleted) {
        res.status(HTTP_404_NOT_FOUND).json({ error: "Template non trouvé" });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({
        error: "Erreur lors de la suppression de la template",
      });
    }
  }
}