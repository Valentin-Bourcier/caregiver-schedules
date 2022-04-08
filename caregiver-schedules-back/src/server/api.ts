/**
 * Express API declaration and setup.
 */
import Api, { Express, NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import Routes from "./routes";
import log4js from "log4js";
const logger = log4js.getLogger();
const api: Express = Api();

/**
 * Configure the gateway to :
 * - Encode URL parameters.
 * - Parse the body of each requests to extract Data as JSON.
 */
api.use(urlencoded({ extended: true }));
api.use(json());

/**
 * Logs requests and apply CORS headers to enable local API redirections ans testing.
 */
api.use((request: Request, response: Response, next: NextFunction) => {
    logger.debug(
        "Request sent to UMB-Back's API.",
        "Method : " + request.method + "\n",
        "Endpoint : " + request.url + "\n",
        "Query : " + JSON.stringify(request.query) + "\n",
        "Headers : " + JSON.stringify(request.headers) + "\n",
        "Body : " + JSON.stringify(request.body)
    );
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

/**
 * Register the API's routes at the root endpoint.
 */
api.use("/", Routes);

/**
 * Default route if nothing have been executed.
 */
api.use((request: Request, response: Response) => {
    response.status(404).json({
        error: "resource.notFound",
        message: "Resource not found."
    });
});

export default api;
