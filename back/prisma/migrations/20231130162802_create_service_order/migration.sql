-- CreateTable
CREATE TABLE `ServiceOrder` (
    `order_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ServiceOrderToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ServiceOrderToUser_AB_unique`(`A`, `B`),
    INDEX `_ServiceOrderToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ServiceOrderToUser` ADD CONSTRAINT `_ServiceOrderToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `ServiceOrder`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServiceOrderToUser` ADD CONSTRAINT `_ServiceOrderToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
