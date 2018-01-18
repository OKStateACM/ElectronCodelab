# 4. Interprocess Communication

In [the previous section](https://github.com/OKStateACM/ElectronCodelab/blob/master/03%20-%20Menus%20and%20Multi-Window%20Functionality.md), we managed to load a second window through the use of menus. But this second window, the *Add Todos* window, doesn't actually add todos. To make this work, we need some form of communication between the windows. Electron's implementation of this is called *interprocess communication* or *IPC*.

### IPC (but abstractly)

IPC is all about issuing events and listening for events.

Electron has two kinds of process:

1. **The main process:** This is pretty much everything that goes on in `index.js`

2. **Renderer processes:** These are all of the other processes -- namely, we're talking our two windows.

Understanding which process is sending a message and which is receiving the message is *crucial* for writing IPC functionality. This is because renderer processes can't talk to each other directly -- they have to use the main process as an intermediary!

This means there are up to four possible points along the IPC timeline:

1. **Renderer issues event to main process:** In the renderer's script, call
```js
ipcRenderer.send(eventName, /* additional parameters */);
```

2. **Main process receives event from renderer process:** In `index.js`, call
```js
ipcMain.on(eventName, (event, /* additional parameters */) => {});
```

3. **Main process issues event to renderer process:** In `index.js`, where `window` is the variable for whichever renderer process you're issuing the event to, call
```js
window.webContents.send(eventName, /* additional parameters */);
```

4. **Renderer process receives event from main process:** In the renderer's script, call
```js
ipcRenderer.on(eventName, (event, /* additional parameters */) => {});
```

![Diagram of Electron IPC, depicting renderer process 1 sending the main process a communication through IPC, and the main process sending renderer process 2 a communication through webContents, but showing IPC between the renderer processes as not possible.](http://delved.org/electron-workshop-slides/images/ipcCommunication.png)

### IPC (but for real)

#### 1. Renderer Issues Event

Let's start with step 1 of the above IPC timeline: the renderer process (here, the *Add Todo* window) issues an event to the main process.

##### `add.html`

```html
    <!-- ... -->
    </center>

    <script>
        const electron = require('electron');
        const ipcRenderer = electron.ipcRenderer;

        document.querySelector('form').addEventListener('submit', () => {
                event.preventDefault();
                ipcRenderer.send('CREATE_TODO1', document.getElementById('todoName').value);
            });
    </script>
</body>
```

#### 2. Main Process Receives Event

Next, let's make sure our main process can receive this new `'CREATE_TODO1'` event.

##### `index.js`

```js
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
```

. . .

```js
app.on('ready', () => {
    // ...
});

ipcMain.on('CREATE_TODO1', (event, name) => {
    // TODO: Send message to index.html
    addWindow.close();
});
```

The `event` object, while unused here, is useful for providing metadata such as the event's issuer. We'll be using the `name` parameter, which will store the contents of the todo name box.

We're closing `addWindow` because that's the expected experience.

#### 3. Main Process Issues Event

Now that we know the main process is receiving the `'CREATE_TODO1'` event, we want it to alert `mainWindow` of this change to the todo list.

##### `index.js`

```js
ipcMain.on('CREATE_TODO1', (event, name) => {
    mainWindow.webContents.send('CREATE_TODO2', name);
    addWindow.close();
});
```

#### 4. Renderer Receives Event

The main process has issued the `'CREATE_TODO2'` event. Let's make sure `index.html` receives this event!

##### `index.html`

```html
<body>
    <center><h1>TODOS</h1></center>
    <table class="table" id="list"></table>

    <script>
        const electron = require('electron');
        const ipcRenderer = electron.ipcRenderer;
        var todos = [];

        ipcRenderer.on('CREATE_TODO2', (event, name) => {
            addItem(name);
        });

        window.onload = function () {
            // ...
        }
    </script>
```

Give it a whirl! If everything's working as intended, you should be able to add new todo items to the list!

***

### Current State of the Code:

##### `index.js`

```js
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
```

##### `add.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Add Todo</title>
        <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css" />
    </head>
    <body>
        <center>
            <br />
            <h1>ADD TODO</h1>
            <form>
                <input class="form-control" id="todoName" style="background-color: #171717; width: 90%; color: white;" placeholder="Enter name of todo">
                <input type="submit" class="btn btn-secondary" style="margin: 10px;"/>
            </form>
        </center>

        <script>
            const electron = require('electron');
            const ipcRenderer = electron.ipcRenderer;

            document.querySelector('form').addEventListener('submit', () => {
                event.preventDefault();
                ipcRenderer.send('CREATE_TODO1', document.getElementById('todoName').value);
            });
        </script>
    </body>
</html>
```

##### `index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Todos</title>
        <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css" />
    </head>
    <body>
        <center><h1>TODOS</h1></center>
        <table class="table" id="list"></table>

        <script>
            const electron = require('electron');
            const ipcRenderer = electron.ipcRenderer;
            var todos = [];

            ipcRenderer.on('CREATE_TODO2', (event, name) => {
                addItem(name);
            });

            window.onload = function () {
                addItem('Hello World!');
                addItem('Foo Bar');
                addItem('This is a todo');
            }

            // POPULATES HTML TABLE GIVEN THE CONTENTS OF THE TODOS ARRAY
            function loadTable() {
                var list = document.getElementById('list');
                list.innerHTML = '';
                for (var i = 0; i < todos.length; i++) {
                    list.innerHTML += `<tr>
                        <td style="width: 5%;"><button class="btn btn-danger" onclick="removeItem(${i})">X</button></td>
                        <td style="font-size: 150%;">${todos[i]}</td>
                    </tr>`
                }
            }

            // ADDS AN ITEM TO THE TODOS ARRAY, AND RELOADS THE HTML TABLE
            function addItem(name) {
                todos.push(name);
                loadTable();
            }

            // REMOVES AN ITEM FROM THE TODOS ARRAY GIVEN THE INDEX, AND RELOADS THE HTML TABLE
            function removeItem(index) {
                todos.splice(index, 1);
                loadTable();
            }
        </script>
    </body>
</html>
```
