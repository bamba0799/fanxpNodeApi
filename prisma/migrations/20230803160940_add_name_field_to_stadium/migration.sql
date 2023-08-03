/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Stadium` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Stadium` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Stadium_name_key` ON `Stadium`(`name`);
