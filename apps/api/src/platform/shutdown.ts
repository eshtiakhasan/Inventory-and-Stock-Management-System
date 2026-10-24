/** The parts of the HTTP server that shutdown uses. */
export interface ClosableServer {
  close(callback: (err?: Error) => void): unknown;
  closeIdleConnections(): void;
  closeAllConnections(): void;
}

export interface ShutdownDeps {
  server: ClosableServer;
  pool: { end(): Promise<void> };
  cleanup: { stop(): Promise<void> };
  log: {
    info(obj: object, msg: string): void;
    warn(obj: object, msg: string): void;
    error(obj: object, msg: string): void;
  };
  /** How long in-flight requests may take to finish (NFR8.8: 10 s). */
  timeoutMs?: number;
}

export const SHUTDOWN_TIMEOUT_MS = 10_000;

/**
 * Graceful shutdown (NFR8.8, reliability-design.md): stop the clean-up timer
 * and wait for a running clean-up; stop accepting connections; wait up to the
 * timeout for in-flight requests; then end the pool. The caller exits after.
 */
export async function shutdown(deps: ShutdownDeps): Promise<void> {
  const timeoutMs = deps.timeoutMs ?? SHUTDOWN_TIMEOUT_MS;
  deps.log.info({ event: "shutdown.start" }, "shutting down");
  await deps.cleanup.stop();

  const closed = new Promise<void>((resolve) => {
    deps.server.close((err) => {
      if (err) deps.log.warn({ err }, "server close reported an error");
      resolve();
    });
  });
  deps.server.closeIdleConnections();

  let timer: NodeJS.Timeout | undefined;
  const timedOut = new Promise<"timeout">((resolve) => {
    timer = setTimeout(() => resolve("timeout"), timeoutMs);
  });
  const outcome = await Promise.race([
    closed.then(() => "closed" as const),
    timedOut,
  ]);
  clearTimeout(timer);
  if (outcome === "timeout") {
    deps.log.warn(
      { event: "shutdown.timeout", timeoutMs },
      "in-flight requests did not finish; closing them",
    );
    deps.server.closeAllConnections();
    await closed;
  }

  try {
    await deps.pool.end();
  } catch (err) {
    deps.log.error({ err }, "closing the database pool failed");
  }
  deps.log.info({ event: "shutdown.done" }, "shutdown complete");
}
