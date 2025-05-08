import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class DocumentPersonneService {
  // Créer une nouvelle entrée DocumentPersonne
  async createDocumentPersonne(data) {
    return await prisma.documentPersonne.create({
      data: {
        fonction: data.fonction,
        documentId: data.documentId,
        personneId: data.personneId,
      },
    });
  }

  // Récupérer toutes les entrées DocumentPersonne
  async getAllDocumentPersonnes() {
    return await prisma.documentPersonne.findMany({
      include: {
        document: true,
        personne: true,
      },
    });
  }

  // Récupérer une entrée DocumentPersonne par ID
  async getDocumentPersonneById(id) {
    return await prisma.documentPersonne.findUnique({
      where: { id },
      include: {
        document: true,
        personne: true,
      },
    });
  }

  // Mettre à jour une entrée DocumentPersonne
  async updateDocumentPersonne(id, data) {
    return await prisma.documentPersonne.update({
      where: { id },
      data: {
        fonction: data.fonction,
        documentId: data.documentId,
        personneId: data.personneId,
      },
    });
  }

  // Supprimer une entrée DocumentPersonne
  async deleteDocumentPersonne(id) {
    return await prisma.documentPersonne.delete({
      where: { id },
    });
  }
}