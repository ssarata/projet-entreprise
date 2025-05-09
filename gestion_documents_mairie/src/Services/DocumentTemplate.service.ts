import { PrismaClient, DocumentTemplate } from '@prisma/client';

const prisma = new PrismaClient();

export default class DocumentTemplateService {
  // Create a new template
  async createTemplate(data: DocumentTemplate): Promise<DocumentTemplate> {
    try {
      return await prisma.documentTemplate.create({ data });
    } catch (error: any) {
      throw new Error("Error creating template: " + error.message);
    }
  }

  // Get all templates
  async getAllTemplates(): Promise<DocumentTemplate[]> {
    try {
      return await prisma.documentTemplate.findMany();
    } catch (error: any) {
      throw new Error("Error fetching templates: " + error.message);
    }
  }

  // Get a template by ID
  async getTemplateById(id: number): Promise<DocumentTemplate | null> {
    try {
      return await prisma.documentTemplate.findUnique({ where: { id } });
    } catch (error: any) {
      throw new Error("Error fetching template by ID: " + error.message);
    }
  }
}