import { Request, Response } from 'express';
import authService from '../Services/auth.service';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      res.status(400).json({ error: 'Email et mot de passe sont requis' });
      return;
    }

    const token = await authService.login(email, password);

    if (!token) {
      res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    } else {
      res.status(200).json({ token });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur interne du serveur', details: error.message });
  }
};

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, nom, prenom } = req.body;

    // Vérification des champs requis
    if (!email || !password || !nom || !prenom) {
      res.status(400).json({ error: 'Email, mot de passe, nom et prénom sont requis' });
      return;
    }

    // Appel au service avec les données de la personne
    await authService.register(email, password, { nom, prenom });
    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur interne du serveur', details: error.message });
  }
};