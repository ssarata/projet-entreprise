# Utilisation d'une image Node.js Alpine (légère)
FROM node:18-alpine

# Définition du répertoire de travail
WORKDIR /app

# 1. Copie des fichiers de dépendances
COPY package.json package-lock.json ./
COPY prisma ./prisma

# 2. Installation des dépendances (production seulement)
RUN npm ci --only=production

# 3. Génération du client Prisma
RUN npx prisma generate

# 4. Copie du code source
COPY . .

# 5. Installation des dépendances de développement pour la construction (si nécessaire)
RUN npm install --only=development

# 6. Commande de démarrage

CMD ["npm", "run", "start:prod"]