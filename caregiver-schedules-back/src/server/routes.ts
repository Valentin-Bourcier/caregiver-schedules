/**
 * Handles HTTP requests made to the API.
 */
import { Router } from "express";
import ShedulesRoutesHandler from "../schedules/schedules.routes.handler";

const Routes = Router();

/**
 * Sub-routes declaration.
 */
Routes.use("/shedules", ShedulesRoutesHandler);

export default Routes;
