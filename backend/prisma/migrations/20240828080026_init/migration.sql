-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnCards` (
    `userId` INTEGER NOT NULL,
    `cardId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `cardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOnCards` ADD CONSTRAINT `UsersOnCards_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnCards` ADD CONSTRAINT `UsersOnCards_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
