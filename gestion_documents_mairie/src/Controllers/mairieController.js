import MairieValidate from '../Validations/MairieValidate.js';
import mairieService from '../Services/mairieService.js';
import fs from 'fs';
import path from 'path';
import prisma from '../prismaClient.js';

export const createMairie = async (req, res) => {
  try {
    const { ville, commune, region, prefecture } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Logo requis' });
    }

    // Validation des données
    const validatedData = MairieValidate({});
    validatedData.ville = ville;
    validatedData.commune = commune;
    validatedData.region = region;
    validatedData.prefecture = prefecture;

    const logoPath = `/uploads/${req.file.filename}`;

    // Utilisation des informations de l'utilisateur connecté
    const userId = req.user.id; // Récupéré depuis le middleware d'authentification

    const mairie = await prisma.mairie.create({
      data: {
        ville: validatedData.ville,
        commune: validatedData.commune,
        region: validatedData.region,
        prefecture: validatedData.prefecture,
        logo: logoPath,
        userId, // Associe la mairie à l'utilisateur connecté
      },
    });

    res.status(201).json(mairie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMairie = async (req, res) => {
  const mairieId = parseInt(req.params.id);
  const { ville, commune, region, prefecture } = req.body;

  try {
    const existing = await prisma.mairie.findUnique({
      where: { id: mairieId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Mairie non trouvée' });
    }

    // Validation des données
    const validatedData = MairieValidate({});
    validatedData.ville = ville;
    validatedData.commune = commune;
    validatedData.region = region;
    validatedData.prefecture = prefecture;

    // Si un nouveau logo est fourni, supprimer l'ancien
    let logoPath = existing.logo;
    if (req.file) {
      // Supprimer l'ancien fichier si existant
      const oldPath = `.${existing.logo}`; // Ex: /uploads/xxx.png → ./uploads/xxx.png
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      logoPath = `/uploads/${req.file.filename}`;
    }

    const updated = await prisma.mairie.update({
      where: { id: mairieId },
      data: {
        ville: validatedData.ville,
        commune: validatedData.commune,
        region: validatedData.region,
        prefecture: validatedData.prefecture,
        logo: logoPath,
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMairie = async (req, res) => {
  const mairieId = parseInt(req.params.id);

  try {
    const existing = await prisma.mairie.findUnique({
      where: { id: mairieId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Mairie non trouvée' });
    }

    // Supprimer le logo associé si existant
    if (existing.logo) {
      const logoPath = `.${existing.logo}`; // Ex: /uploads/xxx.png → ./uploads/xxx.png
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    // Supprimer la mairie
    await prisma.mairie.delete({
      where: { id: mairieId },
    });

    res.status(204).send(); // Pas de contenu, suppression réussie
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllMairies = async (req, res) => {
  try {
    const mairies = await prisma.mairie.findMany();
    res.status(200).json(mairies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMairieById = async (req, res) => {
  const mairieId = parseInt(req.params.id);

  try {
    const mairie = await prisma.mairie.findUnique({
      where: { id: mairieId },
    });

    if (!mairie) {
      return res.status(404).json({ error: 'Mairie non trouvée' });
    }

    res.status(200).json(mairie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};