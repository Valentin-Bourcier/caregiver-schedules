const path = window.require("path");
const fs = window.require("fs");

export default class SettingsService {
    constructor() {
        this.datadir = path.join(process.cwd(), "caregiver-schedules-data");
        this.filepath = path.join(this.datadir, "settings.json");

        if (!fs.existsSync(this.datadir)) fs.mkdirSync(this.datadir, { recursive: true });
        if (!fs.existsSync(this.filepath)) {
            this.save({
                weekend_foreground: "",
                weekend_background: "",
                schedules: []
            });
        }
    }

    get = () => {
        let settings;
        if (fs.existsSync(this.filepath)) {
            settings = fs.readFileSync(this.filepath, {
                encoding: "utf8"
            });
        }
        return settings ? JSON.parse(settings) : {};
    };

    save = (settings) => {
        fs.writeFileSync(this.filepath, JSON.stringify(settings), {
            encoding: "utf8",
            flag: "w"
        });
    };
}
