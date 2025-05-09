import { PrismaClient, Document } from '@prisma/client';

const prisma = new PrismaClient();

export default  class DocumentService {

     // Add a new document
  async addDocument(data: Document): Promise<Document> {
    try {
      return await prisma.document.create({ data });
    } catch (error: any) {
      throw new Error("Error creating document: " + error.message);
    }
  }

  // Get all documents
  async getAllDocuments(): Promise<Document[]> {
    try {
      return await prisma.document.findMany({
        include: {
          template: true,
          personnes: true,
          user: true,
        },
      });
    } catch (error: any) {
      throw new Error("Error fetching documents: " + error.message);
    }
  }

  // Find a document by ID
  async getDocumentById(id: number): Promise<Document | null> {
    try {
      return await prisma.document.findUnique({
        where: { id },
        include: {
          template: true,
          personnes: true,
          user: true,
        },
      });
    } catch (error: any) {
      throw new Error("Error fetching document by ID: " + error.message);
    }
  }

  // Update a document by ID
  async updateDocument(id: number, updatedData: Partial<Document>): Promise<Document> {
    try {
      return await prisma.document.update({
        where: { id },
        data: updatedData,
      });
    } catch (error: any) {
      throw new Error("Error updating document: " + error.message);
    }
  }

  // Delete a document by ID
  async deleteDocument(id: number): Promise<boolean> {
    try {
        const deleted = await prisma.document.delete({
        where: { id },
        });
        return !!deleted; // Retourne `true` si la suppression a réussi
    } catch (error) {
        console.error(`Erreur lors de la suppression du document avec l'ID ${id}:`, error);
        return false; // Retourne `false` si une erreur s'est produite
    }
    }
}