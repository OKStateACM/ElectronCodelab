const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const Tray = electron.Tray;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        resizable: false,
        skipTaskbar: true
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    let tray = new Tray('check.png');
    tray.setToolTip('Todos');
    tray.on('click', () => {
        mainWindow.show();
    });

    const contextMenu = Menu.buildFromTemplate(menuTemplate);
    tray.setContextMenu(contextMenu);
    Menu.setApplicationMenu(null);
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
        label: 'Add Todo',
        click() {createAddWindow();}
    },
    {
        label: 'Quit',
        click() {app.quit();}
    }
];
