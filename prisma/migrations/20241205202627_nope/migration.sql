-- DropForeignKey
ALTER TABLE `Maskin` DROP FOREIGN KEY `Maskin_maskinTypId_maskinTypName_fkey`;

-- DropIndex
DROP INDEX `MaskinTyp_id_name_key` ON `MaskinTyp`;

-- AddForeignKey
ALTER TABLE `Maskin` ADD CONSTRAINT `Maskin_maskinTypId_fkey` FOREIGN KEY (`maskinTypId`) REFERENCES `MaskinTyp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
