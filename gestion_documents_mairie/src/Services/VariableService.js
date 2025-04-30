import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class VariableService {

    //ajouter une nouvelle variable
  async createVariable(dataVariable) {
    return await prisma.variable.create({
      data: {
        dataVariable
      },
    });
  }
 //recuperer toutes les variables
  async getAllVariables() {
    return await prisma.variable.findMany({
      include: { template: true }, 
    });
  }

  //recuperer une variable par son id
  async getVariableById(id) {
    return await prisma.variable.findUnique({
      where: { id },
      include: { template: true },
    });
  }
//modifier une variable
  async updateVariable(id, dataVariable) {
    return await prisma.variable.update({
      where: { id },
      dataVariable,
    });
  }

  //supprimer une variable
  async deleteVariable(id) {
    return await prisma.variable.delete({
      where: { id },
    });
  }

  //recuperer les variables d'un template
  async getVariablesByTemplate(templateId) {
    return await prisma.variable.findMany({
      where: { templateId },
    });
  }
}
