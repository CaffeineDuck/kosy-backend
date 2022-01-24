/*
  Warnings:

  - The primary key for the `BookComments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `commentId` on the `BookComments` table. All the data in the column will be lost.
  - Added the required column `content` to the `BookComments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookComments" DROP CONSTRAINT "BookComments_userId_fkey";

-- AlterTable
ALTER TABLE "BookComments" DROP CONSTRAINT "BookComments_pkey",
DROP COLUMN "commentId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ADD CONSTRAINT "BookComments_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_BookCommentReplies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookCommentReplies_AB_unique" ON "_BookCommentReplies"("A", "B");

-- CreateIndex
CREATE INDEX "_BookCommentReplies_B_index" ON "_BookCommentReplies"("B");

-- AddForeignKey
ALTER TABLE "BookComments" ADD CONSTRAINT "BookComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookCommentReplies" ADD FOREIGN KEY ("A") REFERENCES "BookComments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookCommentReplies" ADD FOREIGN KEY ("B") REFERENCES "BookComments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
