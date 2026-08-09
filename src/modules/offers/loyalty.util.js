"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeLoyaltyReadiness = computeLoyaltyReadiness;
function computeLoyaltyReadiness(every, played, redeemed) {
    if (every < 1)
        return { gamesPlayed: 0, toNext: 0, ready: false };
    var accrued = Math.max(0, played - redeemed);
    var earnedCycles = Math.floor(accrued / every);
    return {
        gamesPlayed: accrued,
        toNext: (every - (accrued % every)) % every,
        ready: earnedCycles > redeemed,
    };
}
