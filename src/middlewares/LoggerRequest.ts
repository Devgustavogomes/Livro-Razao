import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pinoHttp({
  logger: pino(),
  autoLogging: true,
  customLogLevel(_req, res, err) {
    if (err || res.statusCode >= 500) return "error";
    else if (res.statusCode >= 400) return "warn";
    else if (res.statusCode >= 300) return "silent";

    return "info";
  },
});
