/*
  Warnings:

  - You are about to drop the `_BookCommentReplies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookCommentReplies" DROP CONSTRAINT "_BookCommentReplies_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookCommentReplies" DROP CONSTRAINT "_BookCommentReplies_B_fkey";

-- AlterTable
ALTER TABLE "BookComment" ADD COLUMN     "repliedToId" INTEGER;

-- DropTable
DROP TABLE "_BookCommentReplies";

-- CreateTable
CREATE TABLE "_DislikedBookComments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DislikedBookComments_AB_unique" ON "_DislikedBookComments"("A", "B");

-- CreateIndex
CREATE INDEX "_DislikedBookComments_B_index" ON "_DislikedBookComments"("B");

-- AddForeignKey
ALTER TABLE "BookComment" ADD CONSTRAINT "BookComment_repliedToId_fkey" FOREIGN KEY ("repliedToId") REFERENCES "BookComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikedBookComments" ADD FOREIGN KEY ("A") REFERENCES "BookComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikedBookComments" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
