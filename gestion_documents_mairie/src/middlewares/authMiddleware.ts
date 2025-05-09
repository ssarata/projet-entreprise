import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = 'votre_clé_secrète';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupère le token dans le header 'Authorization'

  if (!token) {
    res.status(403).json({ message: 'Accès interdit' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Token invalide' });
      return;
    }

    req.user = decoded; // Stocker l'info de l'utilisateur dans la requête
    next();
  });
};

export default authenticateToken;