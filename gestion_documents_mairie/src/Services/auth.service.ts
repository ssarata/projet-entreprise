import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User, Personne } from '@prisma/client';

const prisma = new PrismaClient(); // Assurez-vous que Prisma est correctement configuré
const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète'; // Utilisez une clé secrète sécurisée

/**
 * Connexion d'un utilisateur
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @returns Un objet contenant le token JWT et les informations de l'utilisateur
 */
const login = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { personne: true },
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Vérifier le mot de passe
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error('Mot de passe incorrect');
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Le token expire après 1 heure
    );

    return { token, user };
  } catch (error: any) {
    throw new Error(`Erreur lors de la connexion : ${error.message}`);
  }
};

/**
 * Inscription d'un nouvel utilisateur
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @param personneData - Données associées à la personne
 * @returns L'utilisateur créé
 */
const register = async (
  email: string,
  password: string,
  personneData: Partial<Personne>
): Promise<User> => {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // Vérifier les champs obligatoires pour la personne
    if (!personneData.nom || !personneData.prenom) {
      throw new Error('Les champs nom et prenom sont obligatoires pour créer une personne');
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur et de la personne associée
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        personne: {
          create: {
            nom: personneData.nom,
            prenom: personneData.prenom,
            // Ajoutez d'autres champs ici si nécessaire
          },
        },
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(`Erreur lors de l'inscription : ${error.message}`);
  }
};

export default { login, register };