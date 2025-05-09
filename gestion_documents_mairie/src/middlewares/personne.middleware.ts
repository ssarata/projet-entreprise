import { PrismaClient, Personne } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

interface PersonneRequest extends Request {
  personne?: Personne;
}

export const validatePersonneData = (req: Request, res: Response, next: NextFunction): void => {
  const { nom, prenom } = req.body;

  if (!nom || !prenom) {
    res.status(400).json({
      error: 'Les champs nom et prénom sont obligatoires',
    });
    return;
  }

  // Validation supplémentaire si nécessaire
  next();
};

export const checkPersonneExists = async (
  req: PersonneRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const personne = await prisma.personne.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });

    if (!personne) {
      res.status(404).json({ message: 'Personne non trouvée' });
      return;
    }

    req.personne = personne;
    next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};