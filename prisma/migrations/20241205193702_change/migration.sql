-- DropForeignKey
ALTER TABLE `Maskin` DROP FOREIGN KEY `Maskin_maskinTypId_name_fkey`;

-- AddForeignKey
ALTER TABLE `Maskin` ADD CONSTRAINT `Maskin_maskinTypId_maskinTypName_fkey` FOREIGN KEY (`maskinTypId`, `maskinTypName`) REFERENCES `MaskinTyp`(`id`, `name`) ON DELETE SET NULL ON UPDATE CASCADE;
