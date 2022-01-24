-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "keywords" TEXT[];

-- CreateTable
CREATE TABLE "BookTags" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tagId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bookId" INTEGER,

    CONSTRAINT "BookTags_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "BookComments" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commentId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "BookComments_pkey" PRIMARY KEY ("commentId")
);

-- AddForeignKey
ALTER TABLE "BookTags" ADD CONSTRAINT "BookTags_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookComments" ADD CONSTRAINT "BookComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookComments" ADD CONSTRAINT "BookComments_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
