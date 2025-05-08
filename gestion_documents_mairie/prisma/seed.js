import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insérer des données dans la table Personne
  await prisma.personne.createMany({
    data: [
      {
        nom: 'Doe',
        prenom: 'John',
        profession: 'Développeur',
        adresse: 'Sokodé',
        telephone: '90123456',
        dateNaissance: '1990-01-01',
        nationalite: 'Togolaise',
        numeroCni: 'CNI123456789',
        sexe: 'Masculin',
        lieuNaissance: 'Sokodé',
      },
      {
        nom: 'Dupont',
        prenom: 'Marie',
        profession: 'Médecin',
        adresse: 'Lomé',
        telephone: '98765432',
        dateNaissance: '1985-05-15',
        nationalite: 'Togolaise',
        numeroCni: 'CNI987654321',
        sexe: 'Féminin',
        lieuNaissance: 'Lomé',
      },
      {
        nom: 'Smith',
        prenom: 'Paul',
        profession: 'Designer',
        adresse: 'Kara',
        telephone: '91234567',
        dateNaissance: '1992-03-10',
        nationalite: 'Togolaise',
        numeroCni: 'CNI123987654',
        sexe: 'Masculin',
        lieuNaissance: 'Kara',
      },
    ],
  });

  console.log('Données insérées avec succès dans la table Personne.');
}

main()
  .catch((e) => {
    console.error('Erreur lors de l\'insertion des données :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });