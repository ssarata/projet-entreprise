const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPersonne = async (personneData) => {
  return await prisma.personne.create({
    data: personneData
  });
};

exports.getAllPersonnes = async () => {
  return await prisma.personne.findMany();
};

exports.getPersonneById = async (id) => {
  return await prisma.personne.findUnique({
    where: { id: parseInt(id) },
    include: { documents: true }
  });
};

exports.updatePersonne = async (id, personneData) => {
  return await prisma.personne.update({
    where: { id: parseInt(id) },
    data: personneData
  });
};

exports.deletePersonne = async (id) => {
  return await prisma.personne.delete({
    where: { id: parseInt(id) }
  });
};