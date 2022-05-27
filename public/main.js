// Modules to control application life and create native browser window
const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

function initialize() {
    const configuration = path.join(process.cwd(), "configuration.json");
    if (!fs.existsSync(configuration)) {
        const workdir = path.join(os.homedir(), ".caregiver-schedules");
        fs.writeFileSync(configuration, JSON.stringify({ workdir: workdir }), {
            encoding: "utf8"
        });
    }
}

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            // Workaround to use NodeJs modules. Unsecure !
            // TODO: Find a more secure way to support NodeJs modules.
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
        },
        autoHideMenuBar: true
    });

    // and load the index.html of the app.
    mainWindow.loadURL("file:///index.html");
    mainWindow.once("ready-to-show", () => mainWindow.show());
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    protocol.interceptFileProtocol(
        "file",
        (request, callback) => {
            const url = request.url.substring(7, request.url.length); /* all urls start with 'file://' */
            callback({ path: path.normalize(`${__dirname}/${url}`) });
        },
        (err) => {
            if (err) console.error("Failed to register protocol");
        }
    );
    initialize();
    createWindow();
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
