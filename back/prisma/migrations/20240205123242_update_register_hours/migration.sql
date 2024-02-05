/*
  Warnings:

  - You are about to drop the `serviceorderuser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_order` to the `Register_hours` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `serviceorderuser` DROP FOREIGN KEY `ServiceOrderUser_id_order_fkey`;

-- DropForeignKey
ALTER TABLE `serviceorderuser` DROP FOREIGN KEY `ServiceOrderUser_id_user_fkey`;

-- AlterTable
ALTER TABLE `register_hours` ADD COLUMN `id_order` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `serviceorderuser`;

-- CreateTable
CREATE TABLE `_ServiceOrderToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ServiceOrderToUser_AB_unique`(`A`, `B`),
    INDEX `_ServiceOrderToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Register_hours` ADD CONSTRAINT `Register_hours_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `ServiceOrder`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServiceOrderToUser` ADD CONSTRAINT `_ServiceOrderToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `ServiceOrder`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServiceOrderToUser` ADD CONSTRAINT `_ServiceOrderToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
