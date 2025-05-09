import { Request, Response } from 'express';
import mairieService from '../Services/mairie.service';

export const createMairie = async (req: Request, res: Response): Promise<void> => {
  try {
    const mairie = await mairieService.createMairie(req.body);
    res.status(201).json(mairie);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllMairies = async (req: Request, res: Response): Promise<void> => {
  try {
    const mairies = await mairieService.getAllMairies();
    res.status(200).json(mairies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMairieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const mairie = await mairieService.getMairieById(id);
    if (!mairie) {
      res.status(404).json({ error: 'Mairie non trouvée' });
    } else {
      res.status(200).json(mairie);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMairie = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedMairie = await mairieService.updateMairie(id, req.body);
    res.status(200).json(updatedMairie);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMairie = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    await mairieService.deleteMairie(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};