-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'COMMUNITY', 'FRIENDS');

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE';
