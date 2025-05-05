/*
  Warnings:

  - A unique constraint covering the columns `[typeDocument]` on the table `DocumentTemplate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomVariable]` on the table `Variable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DocumentTemplate_typeDocument_key" ON "DocumentTemplate"("typeDocument");

-- CreateIndex
CREATE UNIQUE INDEX "Variable_nomVariable_key" ON "Variable"("nomVariable");
