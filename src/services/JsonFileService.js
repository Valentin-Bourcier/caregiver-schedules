const fs = window.require("fs");

export default class JsonFileService {
    /**
     * Instantiate a JavaScript object from a JSON file.
     *
     * @param {string} filepath The file containing the JSON data.
     * @returns A javascript object reflecting the JSON data in the file.
     */
    get = (filepath) => {
        let data;
        if (fs.existsSync(filepath)) {
            data = fs.readFileSync(filepath, {
                encoding: "utf8"
            });
        }
        return data ? JSON.parse(data) : {};
    };

    /**
     * Write a JSON file from an instantiated a JavaScript object.
     *
     * @param {object} data The object to serialize in JSON.
     * @param {string} filepath The path of the JSON file to create.
     */
    save = (data, filepath) => {
        fs.writeFileSync(filepath, JSON.stringify(data), {
            encoding: "utf8",
            flag: "w"
        });
    };
}
