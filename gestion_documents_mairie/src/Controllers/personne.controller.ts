import { Request, Response } from 'express';
import {
  createPersonne,
  getAllPersonnes,
  getPersonneById,
  updatePersonne,
  deletePersonne,
} from '../Services/personne.service';

export const createPersonneController = async (req: Request, res: Response): Promise<void> => {
  try {
    const personne = await createPersonne(req.body);
    res.status(201).json(personne);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPersonnesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const personnes = await getAllPersonnes();
    res.status(200).json(personnes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPersonneByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const personne = await getPersonneById(id);
    if (!personne) {
      res.status(404).json({ error: 'Personne non trouvée' });
    } else {
      res.status(200).json(personne);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePersonneController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedPersonne = await updatePersonne(id, req.body);
    res.status(200).json(updatedPersonne);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePersonneController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    await deletePersonne(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};