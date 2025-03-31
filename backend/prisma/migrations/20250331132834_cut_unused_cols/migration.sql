/*
  Warnings:

  - You are about to drop the column `PinnedMessageId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `administratorId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `PinnedMessage` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_PinnedMessageId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_administratorId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "PinnedMessageId",
DROP COLUMN "administratorId";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "PinnedMessage";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "color",
DROP COLUMN "profilePic";
