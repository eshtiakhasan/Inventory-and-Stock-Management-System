/**
 * Branded identifiers (NFR2.1). A `BusinessId` can only be made here, so a
 * repository function that takes one can only be called with a business that
 * came from the signed-in caller, from sign-up, or from sign-in. ESLint bans
 * `as BusinessId` casts everywhere else.
 */
declare const businessIdBrand: unique symbol;
declare const userIdBrand: unique symbol;

export type BusinessId = string & { readonly [businessIdBrand]: true };
export type UserId = string & { readonly [userIdBrand]: true };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function assertUuid(kind: string, value: string): void {
  if (!UUID.test(value)) {
    throw new Error(`${kind} must be a UUID, got "${value}"`);
  }
}

/** The only constructor of BusinessId. Use it on ids read from the database. */
export function toBusinessId(value: string): BusinessId {
  assertUuid("BusinessId", value);
  return value as BusinessId;
}

/** The only constructor of UserId. Use it on ids read from the database. */
export function toUserId(value: string): UserId {
  assertUuid("UserId", value);
  return value as UserId;
}
