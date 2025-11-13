/*
  Warnings:

  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `access_token` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `session` table. All the data in the column will be lost.
  - The `emailVerified` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[providerId,accountId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier,value]` on the table `verification` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "public"."account_provider_providerAccountId_key";

-- DropIndex
DROP INDEX "public"."session_sessionToken_key";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "account" DROP CONSTRAINT "account_pkey",
DROP COLUMN "access_token",
DROP COLUMN "expires_at",
DROP COLUMN "id_token",
DROP COLUMN "provider",
DROP COLUMN "providerAccountId",
DROP COLUMN "refresh_token",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "type",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "account_id_seq";

-- AlterTable
ALTER TABLE "session" DROP COLUMN "expires",
DROP COLUMN "sessionToken",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."VerificationToken";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateIndex
CREATE UNIQUE INDEX "account_providerId_accountId_key" ON "account"("providerId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_identifier_value_key" ON "verification"("identifier", "value");
