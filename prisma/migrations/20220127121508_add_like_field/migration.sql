-- CreateTable
CREATE TABLE "_LikedBookComments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikedBookComments_AB_unique" ON "_LikedBookComments"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedBookComments_B_index" ON "_LikedBookComments"("B");

-- AddForeignKey
ALTER TABLE "_LikedBookComments" ADD FOREIGN KEY ("A") REFERENCES "BookComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedBookComments" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
