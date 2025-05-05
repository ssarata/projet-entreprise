import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js'; // Assurez-vous d'avoir configuré Prisma correctement.

const JWT_SECRET = 'votre_clé_secrète'; // Changez cela avec une clé secrète sécurisée

// Vérifier si l'utilisateur existe et si le mot de passe est correct
const login = async (email, password) => {
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
};

// Inscription d'un nouvel utilisateur
const register = async (email, password, personneData) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hashage du mot de passe

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      personne: {
        create: personneData,
      },
    },
  });

  return user;
};

export default { login, register };
