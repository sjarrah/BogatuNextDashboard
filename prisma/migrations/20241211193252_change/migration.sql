/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `MaskinTyp` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Maskin` DROP FOREIGN KEY `Maskin_maskinTypId_fkey`;

-- DropIndex
DROP INDEX `Maskin_maskinTypId_maskinTypName_fkey` ON `Maskin`;

-- CreateIndex
CREATE UNIQUE INDEX `MaskinTyp_id_name_key` ON `MaskinTyp`(`id`, `name`);

-- AddForeignKey
ALTER TABLE `Maskin` ADD CONSTRAINT `Maskin_maskinTypId_maskinTypName_fkey` FOREIGN KEY (`maskinTypId`, `maskinTypName`) REFERENCES `MaskinTyp`(`id`, `name`) ON DELETE SET NULL ON UPDATE CASCADE;
