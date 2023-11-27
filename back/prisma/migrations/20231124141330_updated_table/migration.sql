/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `user` table. All the data in the column will be lost.
  - The required column `user_id` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `timestamp`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`user_id`);

-- CreateTable
CREATE TABLE `Register_hours` (
    `register_id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `exit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`register_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Register_hours` ADD CONSTRAINT `Register_hours_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_cpf_key` TO `user_cpf_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_tag_key` TO `user_tag_key`;
