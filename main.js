const { app, BrowserWindow } = require("electron");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadFile("./src/index.html");
    win.webContents.openDevTools();
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


