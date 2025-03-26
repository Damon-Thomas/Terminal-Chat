/*
  Warnings:

  - You are about to drop the column `filePath` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Message` table. All the data in the column will be lost.
  - Added the required column `username` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "filePath",
DROP COLUMN "filename",
DROP COLUMN "size",
ADD COLUMN     "username" TEXT NOT NULL;
