import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class DocumentTemplateService {

    //ajouter une nouvelle template
    async createtemplate(data) {
      // Vérifie l'unicité du nom de template
      const exist = await prisma.documentTemplate.findUnique({
        where: {
          typeDocument: data.typeDocument,
        },
      });
  
      if (exist) {
        throw new Error("Le type  existe déjà.");
      }
  
      // Si unique, on crée
      return await prisma.documentTemplate.create({
        data,
      });
    }
 //recuperer toutes les templates
  async getAlltemplates() {
    return await prisma.documentTemplate.findMany();
  }

  //recuperer une template par son id
  async getTemplateById(id) {
    return await prisma.documentTemplate.findUnique({
      where: { id },
    });
  
}
//modifier une template
  async updatetemplate(id, datatemplate) {
    return await prisma.documentTemplate.update({
      where: { id },
      data:datatemplate,
    });
   
  }


  //supprimer une template
  async deletetemplate(id) {
    return await prisma.documentTemplate.delete({
      where: { id },
    });
  }
  async createtemplateVariable(data) {
    // Si unique, on crée
    return await prisma.documentTemplateVariable.create({
      data,
    });
  }


// async getVariableByTemplate(templateId) {
//   return await prisma.documentTemplateVariable.findMany({
//     where: { templateId },
//   });
// }

  //recuperer les templates d'un template
  // async gettemplatesByTemplate(templateId) {
  //   return await prisma.template.findMany({
  //     where: { templateId },
  //   });
  // }n
}
