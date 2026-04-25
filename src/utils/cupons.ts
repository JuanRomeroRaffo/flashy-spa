/**
 * Coupon token registry.
 *
 * Each coupon gets one or more opaque tokens that map to it.
 * The QR codes on flyers should point to  /?c=<token>
 *
 * To add a new token for the same coupon (e.g. a new batch of flyers),
 * just add another entry here. You can also expire old ones by setting
 * an `expires` date.
 *
 * To generate a new random token, run in your terminal:
 *   node -e "console.log(require('crypto').randomBytes(8).toString('base64url'))"
 */

interface CuponToken {
  /** The actual coupon code stored in the database */
  cupon: string;
  /** Human-readable label for internal reference */
  label: string;
  /** Optional expiration date (ISO string). After this date the token is invalid. */
  expires?: string;
}

const TOKEN_REGISTRY: Record<string, CuponToken> = {
  // ── Milhojas Valencia — Batch 1 (April 2026) ──────────────────────
  'fY8kQ2xmV': {
    cupon: 'MILHOJASVALENCIA',
    label: 'Milhojas Valencia — Folletos Abril 2026',
    expires: '2026-05-30T23:59:59-04:00',
  },

  // To add more tokens later:
  // 'newRandomToken': {
  //   cupon: 'MILHOJASVALENCIA',
  //   label: 'Milhojas Valencia — Folletos Mayo 2026',
  //   expires: '2026-07-31T23:59:59-04:00',
  // },
};

/**
 * Resolves an opaque URL token to a valid coupon code.
 * Returns `null` if the token is unknown or expired.
 */
export function resolveToken(token: string | null | undefined): string | null {
  if (!token) return null;

  const entry = TOKEN_REGISTRY[token];
  if (!entry) return null;

  // Check expiration
  if (entry.expires) {
    const now = new Date();
    const expiresAt = new Date(entry.expires);
    if (now > expiresAt) return null;
  }

  return entry.cupon;
}
