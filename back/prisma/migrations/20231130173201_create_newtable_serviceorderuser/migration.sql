/*
  Warnings:

  - You are about to drop the `_serviceordertouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_serviceordertouser` DROP FOREIGN KEY `_ServiceOrderToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_serviceordertouser` DROP FOREIGN KEY `_ServiceOrderToUser_B_fkey`;

-- DropTable
DROP TABLE `_serviceordertouser`;

-- CreateTable
CREATE TABLE `ServiceOrderUser` (
    `service_order_user_id` VARCHAR(191) NOT NULL,
    `id_order` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ServiceOrderUser_id_order_id_user_key`(`id_order`, `id_user`),
    PRIMARY KEY (`service_order_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceOrderUser` ADD CONSTRAINT `ServiceOrderUser_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `ServiceOrder`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceOrderUser` ADD CONSTRAINT `ServiceOrderUser_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
