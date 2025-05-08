import DocumentPersonneService from '../Services/DocumentPersonneService.js';

export class DocumentPersonneController {
  constructor() {
    this.documentPersonneService = new DocumentPersonneService();
  }

  // Créer une nouvelle entrée
  async create(req, res) {
    try {
      const data = req.body;
      const newDocumentPersonne = await this.documentPersonneService.createDocumentPersonne(data);
      res.status(201).json(newDocumentPersonne);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer toutes les entrées
  async findAll(req, res) {
    try {
      const documentPersonnes = await this.documentPersonneService.getAllDocumentPersonnes();
      res.status(200).json(documentPersonnes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer une entrée par ID
  async findById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const documentPersonne = await this.documentPersonneService.getDocumentPersonneById(id);
      if (!documentPersonne) {
        return res.status(404).json({ error: 'DocumentPersonne non trouvé' });
      }
      res.status(200).json(documentPersonne);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Mettre à jour une entrée
  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const updatedDocumentPersonne = await this.documentPersonneService.updateDocumentPersonne(id, data);
      res.status(200).json(updatedDocumentPersonne);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Supprimer une entrée
  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      await this.documentPersonneService.deleteDocumentPersonne(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}