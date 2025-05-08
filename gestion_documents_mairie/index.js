import express from 'express';
import authRouter from "./src/Routes/authRouter.js";
import authenticateToken from './src/middlewares/authMiddleware.js';
import mairieRouter from './src/Routes/mairieRouter.js';
import variableRoutes from './src/Routes/VariableRoute.js';
import routesTemplates from './src/Routes/DocumentTemplateRoute.js';
import documentRoutes from './src/Routes/DocumentRoute.js';
import documentPersonneRoutes from './src/Routes/DocumentPersonneRoute.js';


//import personneRouter from './src/Routes/personne.route.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// Middleware pour gérer les fichiers statiques

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json()); // Pour parser les données JSON
app.use('/api/variables', variableRoutes);
app.use('/api/templates', routesTemplates);
app.use('/api/documents', documentRoutes);
//app.use('/api/personnes', personneRouter); 
app.use('/api/document-personnes', documentPersonneRoutes);




app.use('/api/mairies', mairieRouter);

// Routes publiques
app.use('/auth', authRouter);


// const PORT = process.env.PORT || 3000;
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

