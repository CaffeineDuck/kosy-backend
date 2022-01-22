/*
  Warnings:

  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Made the column `author` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "author" SET NOT NULL;
