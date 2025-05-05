import prisma from '../prismaClient.js';

const createMairie = async (data) => {
  return await prisma.mairie.create({ data });
};

const getAllMairies = async () => {
  return await prisma.mairie.findMany();
};

const getMairieById = async (id) => {
  return await prisma.mairie.findUnique({ where: { id: Number(id) } });
};

const updateMairie = async (id, data) => {
  return await prisma.mairie.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteMairie = async (id) => {
  return await prisma.mairie.delete({ where: { id: Number(id) } });
};

export default {
  createMairie,
  getAllMairies,
  getMairieById,
  updateMairie,
  deleteMairie,
};
