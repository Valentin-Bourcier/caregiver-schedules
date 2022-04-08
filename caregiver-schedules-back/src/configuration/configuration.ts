import ConfigurationDevelopment from "./configuration.development";
import ConfigurationProduction from "./configuration.production";
import ConfigurationTests from "./configuration.tests";
import ConfigurationType from "./configuration.type";
import log4js from "log4js";

const logger = log4js.getLogger();

let configuration: ConfigurationType;

if (process.env.TS_NODE_DEV) {
    logger.level = "debug";
    configuration = new ConfigurationDevelopment();
    logger.info("UMB-Back development configuration selected.");
} else if (process.env.TESTS) {
    logger.level = "info";
    configuration = new ConfigurationTests();
    logger.info("UMB-Back testing configuration selected.");
} else {
    logger.level = "info";
    configuration = new ConfigurationProduction();
    logger.info("UMB-Back production configuration selected.");
}

export default configuration;
