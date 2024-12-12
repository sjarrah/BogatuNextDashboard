/*
  Warnings:

  - You are about to drop the column `maskinTypId` on the `Maskin` table. All the data in the column will be lost.
  - You are about to drop the column `maskinTypName` on the `Maskin` table. All the data in the column will be lost.
  - You are about to drop the `_MaskinToMaskinTyp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_MaskinToMaskinTyp` DROP FOREIGN KEY `_MaskinToMaskinTyp_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MaskinToMaskinTyp` DROP FOREIGN KEY `_MaskinToMaskinTyp_B_fkey`;

-- DropIndex
DROP INDEX `Maskin_maskinTypId_maskinTypName_fkey` ON `Maskin`;

-- DropIndex
DROP INDEX `MaskinTyp_id_name_key` ON `MaskinTyp`;

-- AlterTable
ALTER TABLE `Maskin` DROP COLUMN `maskinTypId`,
    DROP COLUMN `maskinTypName`,
    ADD COLUMN `endService` DATETIME(3) NULL,
    ADD COLUMN `maskintypId` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `_MaskinToMaskinTyp`;

-- AddForeignKey
ALTER TABLE `Maskin` ADD CONSTRAINT `Maskin_maskintypId_fkey` FOREIGN KEY (`maskintypId`) REFERENCES `MaskinTyp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
