/**
 * Server configuration and setup.
 */
import api from "./api";
import log4js from "log4js";
import configuration from "../configuration/configuration";

const logger = log4js.getLogger();

/**
 * Starts the API server.
 */
const port: number = configuration.server.port;
api.listen(port, () =>
    logger.info(`Server started on http://localhost:${port}.`)
).on("error", (error) =>
    logger.fatal(`Failed to start server on http://localhost:${port}.`, error)
);
