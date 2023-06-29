const { app, BrowserWindow } = require("electron");

const MIN_WIDTH = 1900;
const MIN_HEIGHT = 1000;

const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: MIN_WIDTH,
        minHeight: MIN_HEIGHT, 
        resizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadFile("./src/index.html");
    //win.webContents.openDevTools();       // --------- THIS CODE OPENS DEVELOPMENT CONSOLE ON PROGRAM STARTUP --------- //
    win.maximize();
}
app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});


