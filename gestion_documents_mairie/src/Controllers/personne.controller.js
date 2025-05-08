import * as personneService from '../Services/personne.service.js';

export const createPersonne = async (req, res) => {
  try {
    const userId = req.user.id; // ID de l'utilisateur connecté (ajouté par le middleware)

    // Créez une nouvelle entité Personne et associez-la à l'utilisateur
    const personne = await personneService.createPersonne({
      ...req.body,
      userId, // Associe la personne à l'utilisateur connecté
    });

    res.status(201).json(personne);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updatePersonne = async (req, res) => {
  try {
    // Utilisation de l'utilisateur connecté
    const userId = req.user.id;

    const updatedPersonne = await personneService.updatePersonne(req.params.id, {
      ...req.body,
      userId, // Vérifie ou associe l'utilisateur connecté
    });

    if (!updatedPersonne) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }

    res.json(updatedPersonne);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePersonne = async (req, res) => {
  try {
    // Utilisation de l'utilisateur connecté
    const userId = req.user.id;

    const deletedPersonne = await personneService.deletePersonne(req.params.id, userId);
    if (!deletedPersonne) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }

    res.json({ message: 'Personne supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPersonnes = async (req, res) => {
  try {
    const personnes = await personneService.getAllPersonnes();
    res.json(personnes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPersonneById = async (req, res) => {
  try {
    const personne = await personneService.getPersonneById(req.params.id);
    if (!personne) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }
    res.json(personne);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};