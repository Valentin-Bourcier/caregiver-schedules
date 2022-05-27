const path = window.require("path");
const fs = window.require("fs");

export default class WorkdirService {
    constructor() {
        this.configurationPath = path.join(process.cwd(), "configuration.json");

        this.configuration = JSON.parse(
            fs.readFileSync(this.configurationPath, {
                encoding: "utf8"
            })
        );

        this.workdir = this.configuration.workdir;
        if (!fs.existsSync(this.workdir)) fs.mkdirSync(this.workdir, { recursive: true });
    }

    path = () => this.workdir;
}
