/**
 * Method to fetch an environment variable, defined or not.
 *
 * @param {string} variable The name of the seeked environment variable.
 * @returns {string | undefined} The value of the environment variable if defined, undefined otherwise.
 */
function get(variable: string): string | undefined {
    return process.env[variable];
}

/**
 * Method to fetch an environment variable as a string.
 *
 * @param {string} variable The name of the seeked environment variable.
 * @param {string} predefined The default value if the variable is undefined.
 * @returns {string} The value of the environment variable if defined, the predefined value otherwise.
 * @throws {Error} If the variable is undefined and no default value has been specified.
 */
function getString(variable: string, predefined?: string): string {
    const value = get(variable) || predefined;
    if (!value) {
        throw `Missing environment variable "${variable}".`;
    }
    return value;
}

/**
 * Method to fetch an environment variable as an integer.
 *
 * @param {string} variable The name of the seeked environment variable.
 * @param {number} predefined The default value as an integer, if the variable is undefined.
 * @returns {number} The value of the environment variable as an integer, if defined. The predefined value otherwise.
 * @throws {Error} If the variable is undefined and no default value has been specified.
 */
function getInt(variable: string, predefined?: number): number {
    return parseInt(getString(variable, predefined?.toString()));
}

export default { get, getString, getInt };
