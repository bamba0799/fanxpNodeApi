/*
  Warnings:

  - Made the column `date` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `role` ENUM('SU_ADMIN', 'ADMIN', 'POI') NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE `Quiz` MODIFY `date` TIMESTAMP NOT NULL;
