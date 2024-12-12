-- DropForeignKey
ALTER TABLE `Maskin` DROP FOREIGN KEY `Maskin_maskinTypId_maskinTypName_fkey`;

-- CreateTable
CREATE TABLE `_MaskinToMaskinTyp` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MaskinToMaskinTyp_AB_unique`(`A`, `B`),
    INDEX `_MaskinToMaskinTyp_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MaskinToMaskinTyp` ADD CONSTRAINT `_MaskinToMaskinTyp_A_fkey` FOREIGN KEY (`A`) REFERENCES `Maskin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaskinToMaskinTyp` ADD CONSTRAINT `_MaskinToMaskinTyp_B_fkey` FOREIGN KEY (`B`) REFERENCES `MaskinTyp`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
