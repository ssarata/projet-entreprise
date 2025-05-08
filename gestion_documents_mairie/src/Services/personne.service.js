import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPersonne = async (personneData) => {
  return await prisma.personne.create({ data: personneData });
};

export const getAllPersonnes = async () => {
  return await prisma.personne.findMany();
};

export const getPersonneById = async (id) => {
  return await prisma.personne.findUnique({ where: { id: parseInt(id) } });
};

export const updatePersonne = async (id, personneData) => {
  return await prisma.personne.update({
    where: { id: parseInt(id) },
    data: personneData,
  });
};

export const deletePersonne = async (id) => {
  return await prisma.personne.delete({ where: { id: parseInt(id) } });
};