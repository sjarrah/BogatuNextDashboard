/*
  Warnings:

  - You are about to drop the column `maskinId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `_BesiktningsPunktToMaskinTyp` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `phone` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_maskinId_fkey`;

-- DropForeignKey
ALTER TABLE `Maskin` DROP FOREIGN KEY `Maskin_maskinTypId_fkey`;

-- DropForeignKey
ALTER TABLE `_BesiktningsPunktToMaskinTyp` DROP FOREIGN KEY `_BesiktningsPunktToMaskinTyp_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BesiktningsPunktToMaskinTyp` DROP FOREIGN KEY `_BesiktningsPunktToMaskinTyp_B_fkey`;

-- DropIndex
DROP INDEX `Maskin_maskinTypId_key` ON `Maskin`;

-- DropIndex
DROP INDEX `Maskin_name_key` ON `Maskin`;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `maskinId`,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Maskin` MODIFY `maskinTypId` INTEGER NULL;

-- DropTable
DROP TABLE `_BesiktningsPunktToMaskinTyp`;

-- CreateTable
CREATE TABLE `BesiktningsResultat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `besiktningsPunktId` INTEGER NOT NULL,
    `maskinId` INTEGER NOT NULL,

    UNIQUE INDEX `BesiktningsResultat_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Maskin` ADD CONSTRAINT `Maskin_maskinTypId_fkey` FOREIGN KEY (`maskinTypId`) REFERENCES `MaskinTyp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BesiktningsResultat` ADD CONSTRAINT `BesiktningsResultat_besiktningsPunktId_fkey` FOREIGN KEY (`besiktningsPunktId`) REFERENCES `BesiktningsPunkt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BesiktningsResultat` ADD CONSTRAINT `BesiktningsResultat_maskinId_fkey` FOREIGN KEY (`maskinId`) REFERENCES `Maskin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
