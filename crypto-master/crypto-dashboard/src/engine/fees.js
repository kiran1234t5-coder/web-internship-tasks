// 1. Centralized Configuration
export const FEE_CONFIG = {
  TAKER_FEE: 0.001,      // 0.1% (Market orders)
  MAKER_FEE: 0.0005,     // 0.05% (Limit orders - usually cheaper)
  MIN_FEE_USD: 0.01,     // Minimum charge per trade
  DISCOUNT_TOKEN_HOLDING: 0.25, // 25% discount if paying with platform token
};

/**
 * Pro Fee Calculator
 * @param {number} price - Current asset price
 * @param {number} qty - Order quantity
 * @param {Object} options - { isMaker: boolean, usePlatformToken: boolean }
 */
export function calculateFee(price, qty, options = {}) {
  const { isMaker = false, usePlatformToken = false } = options;
  
  const volume = price * qty;
  
  // 2. Select base rate based on Maker/Taker status
  let rate = isMaker ? FEE_CONFIG.MAKER_FEE : FEE_CONFIG.TAKER_FEE;

  // 3. Apply discounts (e.g., VIP tiers or Native Token usage)
  if (usePlatformToken) {
    rate = rate * (1 - FEE_CONFIG.DISCOUNT_TOKEN_HOLDING);
  }

  // 4. Calculate final fee with a floor (Minimum Cap)
  let finalFee = volume * rate;
  
  // Agar fee bohot choti hai, toh minimum charge apply karein
  return Math.max(finalFee, FEE_CONFIG.MIN_FEE_USD);
}

/**
 * Helper to get Fee Breakdown for UI
 */
export function getFeeEstimate(price, qty) {
  return {
    taker: calculateFee(price, qty, { isMaker: false }).toFixed(4),
    maker: calculateFee(price, qty, { isMaker: true }).toFixed(4),
    currency: "USD"
  };
}