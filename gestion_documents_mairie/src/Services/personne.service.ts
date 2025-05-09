import { PrismaClient, Personne } from '@prisma/client';

const prisma = new PrismaClient();

export const createPersonne = async (personneData: Personne): Promise<Personne> => {
  try {
    return await prisma.personne.create({ data: personneData });
  } catch (error: any) {
    throw new Error("Error creating personne: " + error.message);
  }
};

export const getAllPersonnes = async (): Promise<Personne[]> => {
  try {
    return await prisma.personne.findMany();
  } catch (error: any) {
    throw new Error("Error fetching personnes: " + error.message);
  }
};

export const getPersonneById = async (id: number): Promise<Personne | null> => {
  try {
    return await prisma.personne.findUnique({ where: { id } });
  } catch (error: any) {
    throw new Error("Error fetching personne by ID: " + error.message);
  }
};

export const updatePersonne = async (id: number, personneData: Partial<Personne>): Promise<Personne> => {
  try {
    return await prisma.personne.update({ where: { id }, data: personneData });
  } catch (error: any) {
    throw new Error("Error updating personne: " + error.message);
  }
};

export const deletePersonne = async (id: number): Promise<void> => {
  try {
    await prisma.personne.delete({ where: { id } });
  } catch (error: any) {
    throw new Error("Error deleting personne: " + error.message);
  }
};