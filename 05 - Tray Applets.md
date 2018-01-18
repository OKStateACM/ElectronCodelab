# 5. Tray Applets

Different applications may want to present themselves differently to best fit the expected user experience. Our humble todo app would probably be considered an applet, i.e. our users wouldn't consider it a full-fledged app like Google Chrome or Atom, but a utility that one might expect to live in their taskbar tray.

### Trays

We can easily refactor our application to be a taskbar-based applet using Electron's `Tray` class.

First, if you haven't already, drag `check.png` from `resources/` into your workspace.

Second, let's destructure the `Tray` class off of `electron`:

```js
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const Tray = electron.Tray;
```

Third, let's create the Tray object inside `app.on('ready')`:

```js
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    let tray = new Tray('check.png');
    tray.setToolTip('Todos');
    tray.on('click', () => {
        mainWindow.show();
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});
```

### The Context Menu

There are few more tweaks we might want to make to our applet.

Let's set the tray icon's context menu -- in other words, the menu that pops up when we right click the tray icon.

We start by making a few modifications to `menuTemplate`:

```js
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
```

Then in `app.on('ready')`, replace

```js
const mainMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(mainMenu);
```

with

```js
const contextMenu = Menu.buildFromTemplate(menuTemplate);
tray.setContextMenu(contextMenu);
Menu.setApplicationMenu(null);
```

### Tweaks to the Main Window

Since we now have the tray icon to maximize our app, we can provide some neat customizations to our `mainWindow` to make the app run a little more sleekly. In `app.on('ready')`:

```js
mainWindow = new BrowserWindow({
    show: false,
    resizable: false,
    skipTaskbar: true
});
```

This makes it so `mainWindow` doesn't just pop up immediately, instead waiting for the tray icon to be clicked. Additionally, it keeps the user from resizing the window, and it keeps the app's icon from showing up with the proper taskbar.

***

### Current State of the Code:

##### `index.js`

```js
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
```
