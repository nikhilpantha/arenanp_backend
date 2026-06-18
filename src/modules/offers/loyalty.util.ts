/**
 * Pure loyalty-readiness maths, shared by the status query and the booking
 * redemption path so both agree on when a free game is earned.
 *
 * `played`   = completed games attributable to the subject (team or phone).
 * `redeemed` = free games already granted to the subject under the loyalty offer
 *              (incl. in-flight ones, so a second can't slip through).
 *
 * Free games don't accrue toward the next reward (otherwise the reward
 * accelerates), so the qualifying tally is `played - redeemed`. A new cycle is
 * "ready" only when the subject has earned more cycles than they've redeemed.
 */
export interface LoyaltyReadiness {
  gamesPlayed: number;
  toNext: number;
  ready: boolean;
}

export function computeLoyaltyReadiness(
  every: number,
  played: number,
  redeemed: number,
): LoyaltyReadiness {
  if (every < 1) return { gamesPlayed: 0, toNext: 0, ready: false };
  const accrued = Math.max(0, played - redeemed);
  const earnedCycles = Math.floor(accrued / every);
  return {
    gamesPlayed: accrued,
    toNext: (every - (accrued % every)) % every,
    ready: earnedCycles > redeemed,
  };
}
