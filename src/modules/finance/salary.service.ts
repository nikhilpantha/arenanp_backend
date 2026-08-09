import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseCategory, MembershipStatus, PayBasis, Prisma } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import type { RecordStaffSalaryPaymentInput, VenueSalariesInput } from './dto/finance.inputs';
import { StaffSalaryRow, VenueSalaryPeriod } from './dto/salary.models';

function num(value: Prisma.Decimal | null | undefined): number {
  return value ? Number(value.toString()) : 0;
}

/** First day of the month a date falls in, as a UTC date. */
function monthStart(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function monthLabel(date: Date): string {
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/**
 * Staff pay.
 *
 * The whole design rests on one decision: a salary payment is an `Expense` with
 * a payee and a period attached, not a table of its own. That is why profit is
 * correct here without a single aggregation being touched — the money is
 * already in the ledger every report reads.
 *
 * What the service adds is the half a ledger can't express: what was agreed,
 * and therefore what is still owed.
 */
@Injectable()
export class SalaryService {
  constructor(private readonly prisma: PrismaService) {}

  async period(input: VenueSalariesInput): Promise<VenueSalaryPeriod> {
    const start = input.periodStart
      ? monthStart(new Date(input.periodStart))
      : monthStart(new Date());
    const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1));

    const [seats, payments] = await Promise.all([
      this.prisma.venueMembership.findMany({
        where: { venueId: input.venueId, status: MembershipStatus.ACTIVE },
        include: { user: { select: { fullName: true } } },
        orderBy: [{ role: 'asc' }, { createdAt: 'asc' }],
      }),
      this.prisma.expense.groupBy({
        by: ['staffMembershipId'],
        where: {
          venueId: input.venueId,
          category: ExpenseCategory.SALARY,
          staffMembershipId: { not: null },
          salaryPeriodStart: { gte: start, lt: end },
        },
        _sum: { amount: true, salaryQuantity: true },
        _count: { _all: true },
      }),
    ]);

    const paidBySeat = new Map(payments.map((p) => [p.staffMembershipId as string, p]));

    const rows: StaffSalaryRow[] = seats.map((seat) => {
      const paidRow = paidBySeat.get(seat.id);
      const paid = num(paidRow?._sum.amount);
      const quantity = paidRow?._sum.salaryQuantity ? num(paidRow._sum.salaryQuantity) : undefined;
      const rate = seat.payRate ? num(seat.payRate) : undefined;

      const committed = committedFor(seat.payBasis, rate, quantity);

      return {
        membershipId: seat.id,
        fullName: seat.user.fullName ?? undefined,
        role: seat.role,
        basis: seat.payBasis ?? undefined,
        rate,
        committed,
        paid,
        due: committed === undefined ? undefined : Math.max(0, round(committed - paid)),
        quantity,
        paymentCount: paidRow?._count._all ?? 0,
      };
    });

    return {
      periodStart: start.toISOString().slice(0, 10),
      label: monthLabel(start),
      rows,
      committedTotal: round(sum(rows.map((r) => r.committed ?? 0))),
      paidTotal: round(sum(rows.map((r) => r.paid))),
      dueTotal: round(sum(rows.map((r) => r.due ?? 0))),
      // Anyone on a daily or per-session rate whose count nobody has entered.
      // They are missing from the totals, and the screen has to say so — a
      // quietly incomplete "you owe staff" figure is worse than no figure.
      uncountedStaff: rows.filter((r) => r.basis && r.basis !== PayBasis.MONTHLY && !r.quantity)
        .length,
    };
  }

  /**
   * Record what was actually handed over.
   *
   * Writes an `Expense{category: SALARY}`, so from this moment the payment is
   * in net profit, in the transactions ledger, in the expense breakdown, and —
   * if it was cash — in the next day-close's expected drawer. None of that
   * needed building; it follows from choosing the ledger over a private table.
   */
  async recordPayment(input: RecordStaffSalaryPaymentInput, actorId: string) {
    if (input.amount <= 0) throw new BadRequestException('Enter an amount above zero.');

    const seat = await this.prisma.venueMembership.findFirst({
      where: { id: input.membershipId, venueId: input.venueId },
      include: { user: { select: { fullName: true } } },
    });
    if (!seat) throw new NotFoundException('That person is not on this venue’s staff.');

    const period = monthStart(new Date(input.periodStart));

    return this.prisma.expense.create({
      data: {
        venueId: input.venueId,
        category: ExpenseCategory.SALARY,
        amount: input.amount,
        // Defaults to the day it was handed over. Back-dating is allowed and
        // meaningful: `incurredAt` is what every report buckets on, so paying
        // July's wages in August lands in July's profit if the owner says so.
        incurredAt: input.paidAt ?? new Date(),
        paymentMethod: input.paymentMethod,
        description: input.note ?? `Salary — ${monthLabel(period)}`,
        staffMembershipId: seat.id,
        // Snapshot: the seat may be deleted one day; this row must still name
        // the person it paid.
        payeeName: seat.user.fullName ?? undefined,
        salaryPeriodStart: period,
        salaryQuantity: input.quantity,
        createdById: actorId,
      },
    });
  }

  /** Set or clear what someone is paid. */
  async setPayTerms(
    venueId: string,
    membershipId: string,
    basis: PayBasis | null,
    rate: number | null,
  ) {
    if (basis && (rate === null || rate === undefined || rate <= 0)) {
      throw new BadRequestException('Enter what they are paid.');
    }
    const seat = await this.prisma.venueMembership.findFirst({
      where: { id: membershipId, venueId },
    });
    if (!seat) throw new NotFoundException('That person is not on this venue’s staff.');

    return this.prisma.venueMembership.update({
      where: { id: membershipId },
      data: { payBasis: basis, payRate: basis ? rate : null },
    });
  }
}

/**
 * What is owed for one period.
 *
 * Monthly is the rate, every month. Daily and per-session multiply the rate by
 * a count that only exists once the owner enters it — so before that, the
 * answer is `undefined` rather than `0`. The distinction carries all the way
 * to the screen: "nothing owed" and "we don't know yet" must not look alike.
 */
function committedFor(
  basis: PayBasis | null,
  rate: number | undefined,
  quantity: number | undefined,
): number | undefined {
  if (!basis || rate === undefined) return undefined;
  if (basis === PayBasis.MONTHLY) return rate;
  return quantity === undefined ? undefined : round(rate * quantity);
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
