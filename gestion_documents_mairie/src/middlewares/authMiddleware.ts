import jwt from 'jsonwebtoken';

const JWT_SECRET = 'votre_clé_secrète';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupère le token dans le header 'Authorization'

  if (!token) {
    return res.status(403).json({ message: 'Accès interdit' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }

    req.user = decoded; // Stocker l'info de l'utilisateur dans la requête
    next();
  });
};

export default authenticateToken;
