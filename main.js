const { app, BrowserWindow } = require("electron");

/*
        width: 1200,
        height: 700,
*/

const createWindow = () => {
    const win = new BrowserWindow({
        autoHideMenuBar: true,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadFile("./src/index.html");
    win.webContents.openDevTools();
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


