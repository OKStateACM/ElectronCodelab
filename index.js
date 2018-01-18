const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('CREATE_TODO1', (event, name) => {
    mainWindow.webContents.send('CREATE_TODO2', name);
    addWindow.close();
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 400,
        height: 225,
        resizable: false
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.setMenu(null);
    addWindow.on('closed', () => addWindow = null);
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [{
            label: 'Add Todo',
            click() {createAddWindow();}
        }]
    }
];
