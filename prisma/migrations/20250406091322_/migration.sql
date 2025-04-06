/*
  Warnings:

  - Added the required column `length` to the `Preset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preset" ADD COLUMN     "length" INTEGER NOT NULL;
