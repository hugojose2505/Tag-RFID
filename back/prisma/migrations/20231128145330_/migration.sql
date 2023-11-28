/*
  Warnings:

  - You are about to alter the column `input` on the `register_hours` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `exit` on the `register_hours` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `register_hours` MODIFY `input` DATETIME(3) NULL,
    MODIFY `exit` DATETIME(3) NULL;
