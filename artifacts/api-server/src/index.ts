import app from "./app";
import { logger } from "./lib/logger";
import { refreshAdmitCardsCache } from "./routes/admit-cards";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  refreshAdmitCardsCache(logger).catch(() => {});

  setInterval(() => {
    refreshAdmitCardsCache(logger).catch(() => {});
  }, SIX_HOURS_MS);
});
