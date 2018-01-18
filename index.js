const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

app.on('ready', () => {
    let mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    let addWindow = new BrowserWindow({
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
