/*
  Warnings:

  - You are about to drop the column `rotations` on the `Shelf` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shelf" DROP COLUMN "rotations",
ADD COLUMN     "rotation" INTEGER NOT NULL DEFAULT 0;
