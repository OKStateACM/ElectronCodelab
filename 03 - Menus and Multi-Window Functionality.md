# 3. Menus and Multi-Window Functionality

In [the previous section](https://github.com/OKStateACM/ElectronCodelab/blob/master/02%20-%20Creating%20an%20Electron%20App.md), we created a BrowserWindow that loads `index.html`. In this section, we'll add the functionality to load the todo creation window. This will give us a basic understanding of

* Managing multiple windows in one application

* Menus and menu templates

* Window customization

### Loading a Second Window

Loading a second window isn't any different from our main window. However, since we want our todo creation window to pop up in response to a certain event, let's create a new function for it instead of just cramming it in `app.on('ready')`.

```js
app.on('ready', () => {
    // ...
});

function createAddWindow() {
    let addWindow = new BrowserWindow({});
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.setMenu(null);
    addWindow.on('closed', () => addWindow = null);
}
```

The `addWindow.on('closed')` line makes the app deallocate `addWindow`'s memory when you close the window.

### Menus

Electron provides our app with a menu bar by default. However, we can override the menu with one of our own design.

First, let's destructure Electron's `Menu` class:
```js
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
```

Our menu must be built from a template, which is defined with a JavaScript array.

```js
function createAddWindow() {
    // ...
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
```

Now to actually add the menu to our main window:

```js
app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
```

Run your application again. If all's gone well, you should see that your menu bar only features the *File* menu<sup>**†**</sup> which, when clicked, displays only the *Add Todo* option. Click *Add Todo* and a window containing `add.html` pops up!

<sup>**†**</sup> If you're on a Mac, the first element of the menu is subsumed into the application menu. There are workarounds for this, but that's outside the scope of this codelab.

### Window Customization

The *Add Todo* window is created with a lot of default properties like width and height -- the same defaults used by the main window. Let's add some variation.

Notice the line

```js
let addWindow = new BrowserWindow({});
```

We're currently passing in a blank object as a parameter to the `BrowserWindow` constructor. This object is the `options` object, and it's used to define window properties. Let's change this object to:

```js
function createAddWindow() {
    let addWindow = new BrowserWindow({
        width: 400,
        height: 225,
        resizable: false
    });

    // ...
}
```

Run your app again and open the *Add Todo* window. Notice that the window's dimensions have changed, and you're unable to resize the window.

This highlights only three possible properties that can be defined in `options`. [A complete list can be found here](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions).

<br/>

<center><h6><a href="https://github.com/OKStateACM/ElectronCodelab/blob/master/02%20-%20Creating%20an%20Electron%20App.md">« 2. Creating an Electron App</a> | <a href="https://github.com/OKStateACM/ElectronCodelab/blob/master/04%20-%20Interprocess%20Communication.md">4. Interprocess Communication »</a></h6></center>
