/*
  Warnings:

  - You are about to drop the column `adress` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT;
