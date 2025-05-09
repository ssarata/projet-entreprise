import { PrismaClient, DocumentTemplate } from '@prisma/client';

const prisma = new PrismaClient();

export default class DocumentTemplateService {
  // Créer un nouveau template
  async createTemplate(data: { content: string; typeDocument: string }): Promise<DocumentTemplate> {
    try {
      // Vérification des champs obligatoires
      if (!data.content || !data.typeDocument) {
        throw new Error('Les champs "content" et "typeDocument" sont obligatoires.');
      }

      return await prisma.documentTemplate.create({ data });
    } catch (error: any) {
      throw new Error(`Error creating template: ${error.message}`);
    }
  }

  // Récupérer tous les templates
  async getAllTemplates(): Promise<DocumentTemplate[]> {
    try {
      return await prisma.documentTemplate.findMany();
    } catch (error: any) {
      throw new Error(`Error fetching templates: ${error.message}`);
    }
  }

  // Récupérer un template par ID
  async getTemplateById(id: number): Promise<DocumentTemplate | null> {
    try {
      return await prisma.documentTemplate.findUnique({ where: { id } });
    } catch (error: any) {
      throw new Error(`Error fetching template by ID: ${error.message}`);
    }
  }

  // Mettre à jour un template
  async updateTemplate(
    id: number,
    data: Partial<DocumentTemplate>
  ): Promise<DocumentTemplate | null> {
    try {
      return await prisma.documentTemplate.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new Error(`Error updating template: ${error.message}`);
    }
  }

  // Supprimer un template
  async deleteTemplate(id: number): Promise<boolean> {
    try {
      await prisma.documentTemplate.delete({ where: { id } });
      return true;
    } catch (error: any) {
      console.error(`Error deleting template: ${error.message}`);
      return false;
    }
  }

  // Créer une relation entre une variable et un template
  async createTemplateVariable(data: {
    variableId: number;
    documentTemplateId: number;
  }): Promise<any> {
    try {
      return await prisma.documentTemplateVariable.create({
        data: {
          variableId: data.variableId,
          documentTemplateId: data.documentTemplateId,
        },
      });
    } catch (error: any) {
      throw new Error(
        `Error creating relation between variable and template: ${error.message}`
      );
    }
  }

  // Récupérer toutes les variables liées à un template
  async getVariablesByTemplateId(templateId: number): Promise<any[]> {
    try {
      return await prisma.documentTemplateVariable.findMany({
        where: { documentTemplateId: templateId },
        include: { variable: true },
      });
    } catch (error: any) {
      throw new Error(
        `Error fetching variables linked to template: ${error.message}`
      );
    }
  }
}