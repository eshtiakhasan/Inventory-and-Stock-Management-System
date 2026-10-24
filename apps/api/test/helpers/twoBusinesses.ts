/**
 * Isolation harness (NFR2.2): two businesses, A and B, each with its own
 * Owner. `seedTwoBusinesses` works at the repository level; `twoBusinesses`
 * (added with the API layer) signs both Owners in through the API.
 */
import type { Db } from "../../src/platform/db/db.js";
import { createBusinessWithOwner } from "../../src/modules/identity/internal/repository.js";
import type {
  BusinessId,
  UserId,
} from "../../src/modules/identity/internal/ids.js";
import type { AppBundle } from "../../src/app.js";
import { signUpAgent, type SignedInAgent } from "./app.js";
import { uniquePhone } from "./factories.js";

export interface SeededBusiness {
  businessId: BusinessId;
  userId: UserId;
  phone: string;
}

/**
 * Businesses A and B signed up through the API, each with a signed-in
 * Supertest agent holding its cookie and CSRF token. U2 reuses this for the
 * 404 checks on every record endpoint (AC1.1.4).
 */
export async function twoBusinesses(
  app: AppBundle["app"],
): Promise<{ a: SignedInAgent; b: SignedInAgent }> {
  return {
    a: await signUpAgent(app, { businessName: "Business A" }),
    b: await signUpAgent(app, { businessName: "Business B" }),
  };
}

export async function seedTwoBusinesses(
  db: Db,
): Promise<{ a: SeededBusiness; b: SeededBusiness }> {
  const seed = async (name: string): Promise<SeededBusiness> => {
    const phone = uniquePhone();
    const ids = await db.transaction().execute((trx) =>
      createBusinessWithOwner(trx, {
        businessName: name,
        ownerName: `${name} Owner`,
        phone,
        passwordHash: "$argon2id$not-used-in-these-tests",
      }),
    );
    return { ...ids, phone };
  };
  return { a: await seed("Business A"), b: await seed("Business B") };
}
