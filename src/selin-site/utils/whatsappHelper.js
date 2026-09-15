/**
 * Direct Phone Call Helper
 * Formats telephone call URLs for direct one-tap calling.
 */

export function formatPhoneForCall(phone) {
  if (!phone) return 'tel:+905328904215';
  const cleanNumber = phone.replace(/[^0-9+]/g, '');
  return `tel:${cleanNumber}`;
}
