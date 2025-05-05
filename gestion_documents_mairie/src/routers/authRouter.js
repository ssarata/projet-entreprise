import express from 'express';
import authService from '../services/authService.js';

const router = express.Router();

// Route pour l'inscription
router.post('/register', async (req, res) => {
  try {
    const { email, password, nom, prenom } = req.body;
    const user = await authService.register(email, password, { nom, prenom });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
