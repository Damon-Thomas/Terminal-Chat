/*
  Warnings:

  - You are about to drop the `MessageLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageLikes" DROP CONSTRAINT "MessageLikes_messageId_fkey";

-- DropForeignKey
ALTER TABLE "MessageLikes" DROP CONSTRAINT "MessageLikes_userId_fkey";

-- DropTable
DROP TABLE "MessageLikes";
