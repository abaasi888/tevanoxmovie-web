export const API_URL = import.meta.env.VITE_API_URL || 'https://api.tevanox.com/api/v1';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'TevanoxMovie';
export const APP_URL = import.meta.env.VITE_APP_URL || 'https://tevanox.com';

export const MOVIE_CATEGORIES = [
  { id: 'ugandan', label: '🇺🇬 Ugandan Movies', type: 'local' },
  { id: 'english', label: '🌍 English Movies', type: 'international' },
  { id: 'luganda_translated', label: '🗣️ Luganda Translated', type: 'translated' },
  { id: 'swahili_translated', label: '🗣️ Swahili Translated', type: 'translated' },
];

export const MUSIC_CATEGORIES = [
  { id: 'ugandan', label: '🇺🇬 Ugandan Artists', type: 'local' },
  { id: 'international', label: '🌍 International Artists', type: 'international' },
];

export const SUBSCRIPTION_PLANS = [
  { id: 'weekly', name: 'Weekly', price: 7000, duration: 7 },
  { id: 'biweekly', name: 'Bi-Weekly', price: 12000, duration: 14 },
  { id: 'monthly', name: 'Monthly', price: 20000, duration: 30 },
];

export const COMMISSION_RATES = {
  TEVANOX_SHARE: 0.60,
  NETWORK_TOTAL: 0.40,
  LEVEL_1: 0.25,
  LEVEL_2: 0.10,
  LEVEL_3: 0.05,
};