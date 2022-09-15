/*
  Warnings:

  - Added the required column `peliculaId` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `characters` ADD COLUMN `peliculaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `characters` ADD CONSTRAINT `characters_peliculaId_fkey` FOREIGN KEY (`peliculaId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
