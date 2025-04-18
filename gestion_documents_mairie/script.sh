#initialiser le projet node
npm init
#installer les dependances
npm install
#Installe Prisma CLI en tant que dépendance de développement
npm install prisma --save-dev
# Initialise Prisma dans ton projet
npx prisma init

#lancer les migration apres avoir fini d'implementer les model
npx prisma migrate dev --name init

