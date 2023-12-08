/*
  Warnings:

  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `expirationDate` DATETIME(3) NOT NULL,
    ADD COLUMN `finishDate` DATETIME(3) NOT NULL;
