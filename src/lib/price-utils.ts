export const MARKUP_RATE = 0.015; // 1.5%

/**
 * မူရင်းဈေးအပေါ် 1.5% တိုးပြီး တွက်ပေးသည်
 */
export function calculateFinalPrice(basePrice: number): number {
  if (isNaN(basePrice) || basePrice < 0) return 0;
  return Math.round(basePrice * (1 + MARKUP_RATE));
}

/**
 * တိုးသွားသည့် 1.5% တန်ဖိုး သီးသန့်တွက်ပေးသည်
 */
export function calculateMarkupAmount(basePrice: number): number {
  if (isNaN(basePrice) || basePrice < 0) return 0;
  return Math.round(basePrice * MARKUP_RATE);
}

/**
 * ငွေပမာဏကို ကော်မာပါသည့် မြန်မာကျပ် Format အဖြစ် ပြောင်းပေးသည်
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount) + ' Ks';
}