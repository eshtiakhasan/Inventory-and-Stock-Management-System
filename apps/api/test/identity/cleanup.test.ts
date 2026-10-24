import { sql } from "kysely";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  runSessionCleanup,
  startSessionCleanup,
} from "../../src/modules/identity/internal/cleanup.js";
import { insertSession } from "../../src/modules/identity/internal/repository.js";
import { createDb, createPool, type Db } from "../../src/platform/db/db.js";
import { closeTestDb, truncateIdentity, useTestDb } from "../helpers/db.js";
import { seedTwoBusinesses } from "../helpers/twoBusinesses.js";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

describe("session clean-up", () => {
  let db: Db;

  beforeAll(() => {
    db = useTestDb();
  });
  beforeEach(async () => {
    await truncateIdentity(db);
  });
  afterAll(async () => {
    await closeTestDb();
  });

  it("deletes only sessions expired more than 7 days ago", async () => {
    const { a } = await seedTwoBusinesses(db);
    const now = new Date("2026-10-25T12:00:00Z");
    // Sessions expire 12 hours after `now` is passed to insertSession.
    const createdAt = (expiresAgoMs: number) =>
      new Date(now.getTime() - expiresAgoMs - 12 * HOUR_MS);
    await insertSession(db, {
      idHash: "1".repeat(64),
      userId: a.userId,
      csrfToken: "c",
      now: createdAt(8 * DAY_MS),
    });
    await insertSession(db, {
      idHash: "2".repeat(64),
      userId: a.userId,
      csrfToken: "c",
      now: createdAt(6 * DAY_MS),
    });
    await insertSession(db, {
      idHash: "3".repeat(64),
      userId: a.userId,
      csrfToken: "c",
      now,
    });

    const result = await runSessionCleanup({ db, clock: () => now });

    const left = await db
      .selectFrom("sessions")
      .select("id_hash")
      .orderBy("id_hash")
      .execute();
    expect(result).toEqual({ skipped: false, deleted: 1 });
    expect(left.map((row) => row.id_hash)).toEqual([
      "2".repeat(64),
      "3".repeat(64),
    ]);
  });

  it("skips a second run while another run holds the lock", async () => {
    const result = await db.transaction().execute(async (holder) => {
      await sql`SELECT pg_advisory_xact_lock(hashtext('session-cleanup'))`.execute(
        holder,
      );
      return runSessionCleanup({ db, clock: () => new Date() });
    });

    expect(result).toEqual({ skipped: true, deleted: 0 });
  });

  it("logs a failed run at error and keeps the timer running", async () => {
    const deadDb = createDb(
      createPool(
        {
          connectionString: "postgres://nobody:nothing@127.0.0.1:1/none",
          max: 1,
          connectionTimeoutMillis: 500,
        },
        { warn: () => undefined },
      ),
    );
    const log = { info: vi.fn(), error: vi.fn() };

    const cleanup = startSessionCleanup({
      db: deadDb,
      clock: () => new Date(),
      log,
      intervalMs: 50,
    });
    await vi.waitFor(
      () => expect(log.error.mock.calls.length).toBeGreaterThanOrEqual(2),
      {
        timeout: 5000,
        interval: 25,
      },
    );
    await cleanup.stop();
    await deadDb.destroy();

    expect(log.error).toHaveBeenCalledWith(
      expect.objectContaining({ event: "session.cleanup" }),
      "session clean-up failed",
    );
    expect(log.info).not.toHaveBeenCalled();
  });

  it("logs the deleted count after a successful run, and stop() waits for it", async () => {
    const log = { info: vi.fn(), error: vi.fn() };

    const cleanup = startSessionCleanup({ db, clock: () => new Date(), log });
    await cleanup.stop();

    expect(log.info).toHaveBeenCalledWith(
      { event: "session.cleanup", deleted: 0, skipped: false },
      "session clean-up finished",
    );
    expect(log.error).not.toHaveBeenCalled();
  });
});
