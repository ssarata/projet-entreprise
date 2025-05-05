-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personne" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "profession" TEXT,
    "adresse" TEXT,
    "telephone" TEXT,
    "dateNaissance" TEXT,
    "nationalite" TEXT,
    "numeroCni" TEXT,
    "sexe" TEXT,
    "lieuNaissance" TEXT,

    CONSTRAINT "Personne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentTemplate" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "typeDocument" TEXT NOT NULL,

    CONSTRAINT "DocumentTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variable" (
    "id" SERIAL NOT NULL,
    "nomVariable" TEXT NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentTemplateVariable" (
    "id" SERIAL NOT NULL,
    "documentTemplateId" INTEGER NOT NULL,
    "variableId" INTEGER NOT NULL,

    CONSTRAINT "DocumentTemplateVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "identiteDuMaire" TEXT NOT NULL,
    "templateId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentPersonne" (
    "id" SERIAL NOT NULL,
    "fonction" TEXT NOT NULL,
    "documentId" INTEGER NOT NULL,
    "personneId" INTEGER NOT NULL,

    CONSTRAINT "DocumentPersonne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mairie" (
    "id" SERIAL NOT NULL,
    "ville" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "prefecture" TEXT NOT NULL,

    CONSTRAINT "Mairie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "Personne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTemplateVariable" ADD CONSTRAINT "DocumentTemplateVariable_documentTemplateId_fkey" FOREIGN KEY ("documentTemplateId") REFERENCES "DocumentTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTemplateVariable" ADD CONSTRAINT "DocumentTemplateVariable_variableId_fkey" FOREIGN KEY ("variableId") REFERENCES "Variable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "DocumentTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentPersonne" ADD CONSTRAINT "DocumentPersonne_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentPersonne" ADD CONSTRAINT "DocumentPersonne_personneId_fkey" FOREIGN KEY ("personneId") REFERENCES "Personne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
