const personneService = require('../services/personne.service');

exports.createPersonne = async (req, res) => {
  try {
    const personne = await personneService.createPersonne(req.body);
    res.status(201).json(personne);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPersonnes = async (req, res) => {
  try {
    const personnes = await personneService.getAllPersonnes();
    res.json(personnes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPersonneById = async (req, res) => {
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

exports.updatePersonne = async (req, res) => {
  try {
    const updatedPersonne = await personneService.updatePersonne(req.params.id, req.body);
    if (!updatedPersonne) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }
    res.json(updatedPersonne);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePersonne = async (req, res) => {
  try {
    const deletedPersonne = await personneService.deletePersonne(req.params.id);
    if (!deletedPersonne) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }
    res.json({ message: 'Personne supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};