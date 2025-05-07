import express from 'express';
import authRouter from "./src/Routes/authRouter.js";
import authenticateToken from './src/middlewares/authMiddleware.js';
import mairieRouter from './src/Routes/mairieRouter.js';
import personneRouter from './src/Routes/personne.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Importation des routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// Middleware pour gérer les fichiers statiques

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json()); // Pour parser les données JSON


app.use('/api/mairies', mairieRouter);
app.use('/api/personnes', personneRouter); 
// Routes publiques
app.use('/auth', authRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
