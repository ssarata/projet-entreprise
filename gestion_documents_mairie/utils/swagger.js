import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gestion Documents Mairie API',
      version: '1.0.0',
      description: 'API pour la gestion des documents de la mairie',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Remplacez par l'URL de votre API
        description: 'Serveur local',
      },
    ],
  },
  apis: ['./src/Routes/*.js'], // Chemin vers vos fichiers de routes
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;