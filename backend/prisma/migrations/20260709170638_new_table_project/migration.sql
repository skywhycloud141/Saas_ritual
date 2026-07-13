-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "width" REAL NOT NULL,
    "length" REAL NOT NULL,
    "sceneData" TEXT NOT NULL,
    "installationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
