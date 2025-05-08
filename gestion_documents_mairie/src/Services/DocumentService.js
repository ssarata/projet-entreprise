import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default  class DocumentService {

    // Add a new document
    async addDocument(data) {
       try {
        return await prisma.document.create({
            data
          });
       } catch (error) {
        throw new Error("Error creating document: " + error.message);
        
       }
      }
    // Get all documents
    async getAllDocuments() {
        return await prisma.document.findMany({
            include: {
                template: true,
                personnes: true,
                user: true,
            },
        });
    }

    // Find a document by ID
    async getDocumentById(id) {
        return await prisma.document.findUnique({
            where: { id },
            include: {
                template: true,
                personnes: true,
                user: true,
            },
        });
    }

    // Update a document by ID
    async updateDocument(id, updatedData) {
       try {
        return await prisma.document.update({
            where: { id },
            data: updatedData,
        });
       } catch (error) {
        throw new Error("Error updating document: " + error.message);
        
       }
    }

    // Delete a document by ID
    async deleteDocument(id) {
        return await prisma.document.delete({
            where: { id },
        });
    }
}

