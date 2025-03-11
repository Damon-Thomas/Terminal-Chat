-- CreateTable
CREATE TABLE "MessageLikes" (
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "MessageLikes_pkey" PRIMARY KEY ("userId","messageId")
);

-- AddForeignKey
ALTER TABLE "MessageLikes" ADD CONSTRAINT "MessageLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageLikes" ADD CONSTRAINT "MessageLikes_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
