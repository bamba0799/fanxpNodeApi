-- AlterTable
ALTER TABLE `Match` MODIFY `date` DATE NOT NULL;

-- AlterTable
ALTER TABLE `MatchTicketUser` MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Player` MODIFY `birthday` DATE NOT NULL;
