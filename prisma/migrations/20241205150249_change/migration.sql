/*
  Warnings:

  - You are about to drop the column `maskinId` on the `BesiktningsPunkt` table. All the data in the column will be lost.
  - You are about to drop the column `besiktningsPunktId` on the `BesiktningsResultat` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `BesiktningsResultat` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `BesiktningsResultat` table. All the data in the column will be lost.
  - Added the required column `resultat` to the `BesiktningsResultat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BesiktningsPunkt` DROP FOREIGN KEY `BesiktningsPunkt_maskinId_fkey`;

-- DropForeignKey
ALTER TABLE `BesiktningsResultat` DROP FOREIGN KEY `BesiktningsResultat_besiktningsPunktId_fkey`;

-- DropIndex
DROP INDEX `BesiktningsResultat_name_key` ON `BesiktningsResultat`;

-- AlterTable
ALTER TABLE `BesiktningsPunkt` DROP COLUMN `maskinId`;

-- AlterTable
ALTER TABLE `BesiktningsResultat` DROP COLUMN `besiktningsPunktId`,
    DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `resultat` VARCHAR(191) NOT NULL;
