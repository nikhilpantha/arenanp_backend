-- Staff salary: pay terms on the seat, and the payee/period on the expense.
--
-- A salary payment is deliberately an expense row rather than its own table.
-- Everything that computes profit — netProfit, the trend chart, the category
-- breakdown, the transaction ledger, the cash-day close, the CSV export —
-- already reads `expenses`, so none of them need to change and none of them
-- can drift.

CREATE TYPE "PayBasis" AS ENUM ('MONTHLY', 'DAILY', 'PER_SESSION');

ALTER TABLE "venue_memberships"
  ADD COLUMN "payBasis" "PayBasis",
  ADD COLUMN "payRate" DECIMAL(10,2);

ALTER TABLE "expenses"
  ADD COLUMN "staffMembershipId" TEXT,
  ADD COLUMN "payeeName"         TEXT,
  ADD COLUMN "salaryPeriodStart" DATE,
  ADD COLUMN "salaryQuantity"    DECIMAL(10,2);

-- SetNull, not Cascade: removing someone from the staff must never delete the
-- record of what the venue actually paid them. `payeeName` keeps the row
-- readable once the seat is gone.
ALTER TABLE "expenses"
  ADD CONSTRAINT "expenses_staffMembershipId_fkey"
  FOREIGN KEY ("staffMembershipId") REFERENCES "venue_memberships"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "expenses_staffMembershipId_salaryPeriodStart_idx"
  ON "expenses"("staffMembershipId", "salaryPeriodStart");
