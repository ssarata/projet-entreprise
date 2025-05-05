/*
  Warnings:

  - You are about to drop the column `lieu` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `typeDocument` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Personne` table. All the data in the column will be lost.
  - You are about to drop the column `nomVariable` on the `Variable` table. All the data in the column will be lost.
  - Added the required column `identiteDuMaire` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeDocument` to the `DocumentTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fonction` to the `Variable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "lieu",
DROP COLUMN "typeDocument",
ADD COLUMN     "identiteDuMaire" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DocumentTemplate" ADD COLUMN     "typeDocument" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Personne" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Variable" DROP COLUMN "nomVariable",
ADD COLUMN     "fonction" TEXT NOT NULL;

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
