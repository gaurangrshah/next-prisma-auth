-- DropIndex
DROP INDEX "accounts_user_id_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compound_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_accounts" ("id", "compound_id", "user_id", "provider_type", "provider_id", "provider_account_id", "refresh_token", "access_token", "access_token_expires", "created_at", "updated_at") SELECT "id", "compound_id", "user_id", "provider_type", "provider_id", "provider_account_id", "refresh_token", "access_token", "access_token_expires", "created_at", "updated_at" FROM "accounts";
DROP TABLE "accounts";
ALTER TABLE "new_accounts" RENAME TO "accounts";
CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "accounts"("compound_id");
CREATE INDEX "providerAccountId" ON "accounts"("provider_account_id");
CREATE INDEX "providerId" ON "accounts"("provider_id");
CREATE INDEX "userId" ON "accounts"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
