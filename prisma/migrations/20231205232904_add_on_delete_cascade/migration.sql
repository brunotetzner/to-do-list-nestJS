-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropForeignKey
ALTER TABLE `categoriesOnTasks` DROP FOREIGN KEY `categoriesOnTasks_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `categoriesOnTasks` DROP FOREIGN KEY `categoriesOnTasks_taskId_fkey`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoriesOnTasks` ADD CONSTRAINT `categoriesOnTasks_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoriesOnTasks` ADD CONSTRAINT `categoriesOnTasks_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
