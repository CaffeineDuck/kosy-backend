/*
  Warnings:

  - You are about to drop the `BookComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookComments" DROP CONSTRAINT "BookComments_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookComments" DROP CONSTRAINT "BookComments_userId_fkey";

-- DropForeignKey
ALTER TABLE "BookTags" DROP CONSTRAINT "BookTags_bookId_fkey";

-- DropForeignKey
ALTER TABLE "_BookCommentReplies" DROP CONSTRAINT "_BookCommentReplies_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookCommentReplies" DROP CONSTRAINT "_BookCommentReplies_B_fkey";

-- DropTable
DROP TABLE "BookComments";

-- DropTable
DROP TABLE "BookTags";

-- CreateTable
CREATE TABLE "BookTag" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tagId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bookId" INTEGER,

    CONSTRAINT "BookTag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "BookComment" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "BookComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookTag" ADD CONSTRAINT "BookTag_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookComment" ADD CONSTRAINT "BookComment_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookComment" ADD CONSTRAINT "BookComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookCommentReplies" ADD FOREIGN KEY ("A") REFERENCES "BookComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookCommentReplies" ADD FOREIGN KEY ("B") REFERENCES "BookComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
