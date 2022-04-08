import ConfigurationType from "./configuration.type";
import environment from "./environment";

export default class ConfigurationProduction implements ConfigurationType {
    server = { port:environment.getInt("PORT", 8080) };
}
