import express, { Application } from 'express';
import authRouter from './src/Routes/auth.route';
import authenticateToken from './src/middlewares/authMiddleware';
import mairieRouter from './src/Routes/mairie.route';
import setupSwagger from './utils/swagger';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import personneRouter from './src/Routes/personne.route';
import variableRoutes from './src/Routes/Variable.route';
import routesTemplates from './src/Routes/DocumentTemplate.route';
import documentRoutes from './src/Routes/Document.route';
import documentPersonneRoutes from './src/Routes/DocumentPersonne.route';

dotenv.config();

// Définir __dirname pour les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application Express
const app: Application = express();

// Configuration de Swagger
setupSwagger(app);

// Middleware pour gérer les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware pour parser les données JSON
app.use(express.json());

// Définition des routes
app.use('/auth', authRouter);
app.use('/api/variables', variableRoutes);
app.use('/api/templates', routesTemplates);
app.use('/api/documents', documentRoutes);
app.use('/api/personnes', personneRouter);
app.use('/api/document-personnes', documentPersonneRoutes);
app.use('/api/mairies', mairieRouter);

// Définition du port
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
});