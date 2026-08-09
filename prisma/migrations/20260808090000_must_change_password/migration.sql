-- Force a password change when someone other than the account holder set it.
--
-- Defaults false, so every existing account is unaffected. It is set to true
-- only when a venue owner mints or resets a staff login.
ALTER TABLE "users" ADD COLUMN "mustChangePassword" BOOLEAN NOT NULL DEFAULT false;
