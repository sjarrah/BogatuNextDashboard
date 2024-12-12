/*
  Warnings:

  - Added the required column `BesiktningsPunktId` to the `BesiktningsResultat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BesiktningsResultat` ADD COLUMN `BesiktningsPunktId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BesiktningsResultat` ADD CONSTRAINT `BesiktningsResultat_BesiktningsPunktId_fkey` FOREIGN KEY (`BesiktningsPunktId`) REFERENCES `BesiktningsPunkt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
