import { PrismaClient, DocumentPersonne } from '@prisma/client';

const prisma = new PrismaClient();

export default class DocumentPersonneService {
  // Create a new DocumentPersonne
  async createDocumentPersonne(data: DocumentPersonne): Promise<DocumentPersonne> {
    try {
      return await prisma.documentPersonne.create({ data });
    } catch (error: any) {
      throw new Error("Error creating DocumentPersonne: " + error.message);
    }
  }

  // Get all DocumentPersonnes
  async getAllDocumentPersonnes(): Promise<DocumentPersonne[]> {
    try {
      return await prisma.documentPersonne.findMany();
    } catch (error: any) {
      throw new Error("Error fetching DocumentPersonnes: " + error.message);
    }
  }
}