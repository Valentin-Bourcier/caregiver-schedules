import JsonFileService from "./JsonFileService";
import WorkdirService from "./WorkdirService";

const path = window.require("path");
const fs = window.require("fs");

export default class SettingsService {
    constructor() {
        this.wordirService = new WorkdirService();
        this.jsonFileService = new JsonFileService();

        this.filepath = path.join(this.wordirService.path(), "settings.json");
        if (!fs.existsSync(this.filepath)) {
            this.save({
                weekend_foreground: "",
                weekend_background: "",
                schedules: []
            });
        }
    }

    get = () => this.jsonFileService.get(this.filepath);

    save = (settings) => this.jsonFileService.save(settings, this.filepath);
}
