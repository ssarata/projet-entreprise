import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class VariableService {

    //ajouter une nouvelle variable
    async createVariable(data) {
      // Vérifie l'unicité du nom de variable
      const exist = await prisma.variable.findUnique({
        where: {
          nomVariable: data.nomVariable,
        },
      });
  
      if (exist) {
        throw new Error("Le nom de la variable existe déjà.");
      }
  
      // Si unique, on crée
      return await prisma.variable.create({
        data,
      });
    }
 //recuperer toutes les variables
  async getAllVariables() {
    return await prisma.variable.findMany();
  }

  //recuperer une variable par son id
  async getVariableById(id) {
    return await prisma.variable.findUnique({
      where: { id }    });
  }
//modifier une variable
  async updateVariable(id, dataVariable) {
    return await prisma.variable.update({
      where: { id },
      data:dataVariable,
    });
   
  }

  //supprimer une variable
  async deleteVariable(id) {
    return await prisma.variable.delete({
      where: { id },
    });
  }

  //recuperer les variables d'un template
  // async getVariablesByTemplate(templateId) {
  //   return await prisma.variable.findMany({
  //     where: { templateId },
  //   });
  // }n
}
