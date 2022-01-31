-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "_SavedBooks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BookToBookTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SavedBooks_AB_unique" ON "_SavedBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedBooks_B_index" ON "_SavedBooks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBookTag_AB_unique" ON "_BookToBookTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBookTag_B_index" ON "_BookToBookTag"("B");

-- AddForeignKey
ALTER TABLE "Book" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedBooks" ADD FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedBooks" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookTag" ADD FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookTag" ADD FOREIGN KEY ("B") REFERENCES "BookTag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;
