-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(255) NULL,
    `lastName` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `residence` VARCHAR(100) NULL,
    `nationality` VARCHAR(100) NULL,
    `contact` VARCHAR(20) NOT NULL,
    `photo` TEXT NULL,

    UNIQUE INDEX `User_contact_key`(`contact`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` VARCHAR(191) NOT NULL,
    `matricule` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `seatId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Ticket_matricule_key`(`matricule`),
    UNIQUE INDEX `Ticket_seatId_key`(`seatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketCategory` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchTicketUser` (
    `userId` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `point` INTEGER NULL,

    PRIMARY KEY (`matchId`, `ticketId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stage` (
    `id` VARCHAR(191) NOT NULL,
    `label` ENUM('group', 'sixteen', 'quarter', 'semi', 'final') NOT NULL,
    `debut` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(75) NOT NULL,
    `code` VARCHAR(3) NOT NULL,
    `flag` TEXT NOT NULL,
    `isMemberOfCurrentCAN` BOOLEAN NOT NULL,
    `isDiqualified` BOOLEAN NOT NULL,
    `groupId` VARCHAR(191) NULL,

    UNIQUE INDEX `Team_name_key`(`name`),
    UNIQUE INDEX `Team_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamUser` (
    `teamId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `followedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`teamId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stadium` (
    `id` VARCHAR(191) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(20) NOT NULL,
    `photo` TEXT NOT NULL,

    UNIQUE INDEX `Stadium_contact_key`(`contact`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat` (
    `id` VARCHAR(191) NOT NULL,
    `row` INTEGER NOT NULL,
    `stadiumId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `status` ENUM('next', 'live', 'over') NOT NULL,
    `stadiumId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchStageTeam` (
    `matchId` VARCHAR(191) NOT NULL,
    `stageId` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NOT NULL,
    `isWinner` BOOLEAN NULL,
    `goals` INTEGER NULL,
    `possession` INTEGER NULL,
    `corners` INTEGER NULL,
    `fouls` INTEGER NULL,
    `assists` INTEGER NULL,
    `offsides` INTEGER NULL,
    `redCards` INTEGER NULL,
    `yellowCard` INTEGER NULL,

    PRIMARY KEY (`matchId`, `stageId`, `teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `id` VARCHAR(191) NOT NULL,
    `label` ENUM('a', 'b', 'c', 'd', 'e', 'f') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `jerseyNumber` TINYINT NOT NULL,
    `position` ENUM('goalkeeper', 'defender', 'midfielder', 'stricker') NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `intlCareerGoals` INTEGER NULL,
    `club` VARCHAR(191) NULL,
    `photo` TEXT NULL,
    `teamId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GoodDeal` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `photo` TEXT NOT NULL,
    `interestPointId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterestPointCategory` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterestPoint` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `shortDescription` TINYTEXT NOT NULL,
    `longDescription` TEXT NOT NULL,
    `vip` BOOLEAN NOT NULL DEFAULT false,
    `interestPointCategoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Response` (
    `id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionQuizResponseUser` (
    `questionId` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `responseId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `point` INTEGER NULL,

    PRIMARY KEY (`questionId`, `quizId`, `responseId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `TicketCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `Seat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchTicketUser` ADD CONSTRAINT `MatchTicketUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchTicketUser` ADD CONSTRAINT `MatchTicketUser_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchTicketUser` ADD CONSTRAINT `MatchTicketUser_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamUser` ADD CONSTRAINT `TeamUser_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamUser` ADD CONSTRAINT `TeamUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_stadiumId_fkey` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_stadiumId_fkey` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchStageTeam` ADD CONSTRAINT `MatchStageTeam_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchStageTeam` ADD CONSTRAINT `MatchStageTeam_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchStageTeam` ADD CONSTRAINT `MatchStageTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodDeal` ADD CONSTRAINT `GoodDeal_interestPointId_fkey` FOREIGN KEY (`interestPointId`) REFERENCES `InterestPoint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterestPoint` ADD CONSTRAINT `InterestPoint_interestPointCategoryId_fkey` FOREIGN KEY (`interestPointCategoryId`) REFERENCES `InterestPointCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionQuizResponseUser` ADD CONSTRAINT `QuestionQuizResponseUser_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionQuizResponseUser` ADD CONSTRAINT `QuestionQuizResponseUser_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionQuizResponseUser` ADD CONSTRAINT `QuestionQuizResponseUser_responseId_fkey` FOREIGN KEY (`responseId`) REFERENCES `Response`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionQuizResponseUser` ADD CONSTRAINT `QuestionQuizResponseUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
