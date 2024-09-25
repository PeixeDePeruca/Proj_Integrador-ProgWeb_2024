-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "imageURL" TEXT,
    "videoURL" TEXT,
    "description" TEXT,
    "genre" TEXT,
    "download" TEXT,
    "imageGame" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rating_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "download" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "imageGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favorite_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_gameTogenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_gameTogenre_A_fkey" FOREIGN KEY ("A") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_gameTogenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_gameToimageGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_gameToimageGame_A_fkey" FOREIGN KEY ("A") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_gameToimageGame_B_fkey" FOREIGN KEY ("B") REFERENCES "imageGame" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_downloadTogame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_downloadTogame_A_fkey" FOREIGN KEY ("A") REFERENCES "download" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_downloadTogame_B_fkey" FOREIGN KEY ("B") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "game_id_key" ON "game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "game_name_key" ON "game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rating_id_key" ON "rating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "genre_id_key" ON "genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "genre_name_key" ON "genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "download_id_key" ON "download"("id");

-- CreateIndex
CREATE UNIQUE INDEX "download_name_key" ON "download"("name");

-- CreateIndex
CREATE UNIQUE INDEX "imageGame_id_key" ON "imageGame"("id");

-- CreateIndex
CREATE UNIQUE INDEX "imageGame_name_key" ON "imageGame"("name");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_userId_gameId_key" ON "favorite"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "_gameTogenre_AB_unique" ON "_gameTogenre"("A", "B");

-- CreateIndex
CREATE INDEX "_gameTogenre_B_index" ON "_gameTogenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_gameToimageGame_AB_unique" ON "_gameToimageGame"("A", "B");

-- CreateIndex
CREATE INDEX "_gameToimageGame_B_index" ON "_gameToimageGame"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_downloadTogame_AB_unique" ON "_downloadTogame"("A", "B");

-- CreateIndex
CREATE INDEX "_downloadTogame_B_index" ON "_downloadTogame"("B");
