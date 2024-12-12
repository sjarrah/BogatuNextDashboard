/*
  Warnings:

  - Added the required column `MaskinTypId` to the `BesiktningsPunkt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BesiktningsPunkt` ADD COLUMN `MaskinTypId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BesiktningsPunkt` ADD CONSTRAINT `BesiktningsPunkt_MaskinTypId_fkey` FOREIGN KEY (`MaskinTypId`) REFERENCES `MaskinTyp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
