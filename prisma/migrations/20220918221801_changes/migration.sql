/*
  Warnings:

  - You are about to drop the column `calificacion` on the `movies` table. All the data in the column will be lost.
  - Added the required column `genderId` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movies` DROP COLUMN `calificacion`,
    ADD COLUMN `calification` INTEGER NULL,
    ADD COLUMN `fecha_creacion` DATETIME(3) NULL,
    ADD COLUMN `genderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `genders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
