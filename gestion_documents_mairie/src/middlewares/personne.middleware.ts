import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validatePersonneData = (req, res, next) => {
  const { nom, prenom } = req.body;

  if (!nom || !prenom) {
    return res.status(400).json({
      error: 'Les champs nom et prénom sont obligatoires',
    });
  }

  // Validation supplémentaire si nécessaire
  next();
};

export const checkPersonneExists = async (req, res, next) => {
  try {
    const personne = await prisma.personne.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!personne) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }

    req.personne = personne;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};