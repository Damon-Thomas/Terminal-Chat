-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "PinnedMessageId" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "PinnedMessage" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_PinnedMessageId_fkey" FOREIGN KEY ("PinnedMessageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
