/*
  Warnings:

  - Added the required column `password` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Agency" ("createdAt", "email", "id", "name") SELECT "createdAt", "email", "id", "name" FROM "Agency";
DROP TABLE "Agency";
ALTER TABLE "new_Agency" RENAME TO "Agency";
CREATE UNIQUE INDEX "Agency_email_key" ON "Agency"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
