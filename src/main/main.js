// lanternflytv - A full page URL rotator for digital signage
// Copyright (C) 2023  Asaf Prihadash TailorVJ.com

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require("path");

let hiddenWindow;
let mainWindow;

function createWindow() {
  // hidden window
  hiddenWindow = new BrowserWindow({
    show: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  // Set permission handler for hiddenWindow
  hiddenWindow.webContents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      const allowedPermissions = []; // define the permissions you want to allow here
      callback(allowedPermissions.includes(permission));
    },
  );

  hiddenWindow.loadFile("src/renderer/hidden/hidden.html");
  hiddenWindow.webContents.openDevTools();

  // visible window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  // Set permission handler for mainWindow
  mainWindow.webContents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      const allowedPermissions = []; // define the permissions you want to allow here
      callback(allowedPermissions.includes(permission));
    },
  );

  mainWindow.loadFile("src/renderer/main/main.html");
  mainWindow.maximize();
  mainWindow.setFullScreen(true);
}

// Listen to the "url-change" event from the hidden window
ipcMain.on("url-change", (event, url) => {
  console.log(
    `${new Date().toLocaleTimeString()}: Received URL change event: ${url}`,
  );
  mainWindow.loadURL(url);
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
