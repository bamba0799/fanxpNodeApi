/*
  Warnings:

  - You are about to alter the column `date` on the `Quiz` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `MatchStageTeam` DROP FOREIGN KEY `MatchStageTeam_matchId_fkey`;

-- AlterTable
ALTER TABLE `Quiz` MODIFY `date` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `MatchStageTeam` ADD CONSTRAINT `MatchStageTeam_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
