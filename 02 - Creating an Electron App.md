# 2. Creating an Electron App

### Initializing Our npm Package and Installing Electron

At this point, we should have a workspace folder that contains the `index.html` and `add.html` files. Navigate inside this directory in the command line, and enter the command

```bash
npm init
```

Just hit <kbd>Enter</kbd> for each of the prompts.

This initializes our workspace as a Node.js package. This does two things: (1) It allows us to install packages through npm, and (2) it creates the `package.json` file, which handles our package's metadata and its dependencies. This `package.json` will look something like

```json
{
  "name": "electroncodelab",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Next up, we want to install the `electron` package from npm.

```bash
npm install --save electron
```

If this worked, you should now see a `package-lock.json` file inside your directory, too. We won't need to mess with this.

Open up `package.json` again. There should now be a bit at the bottom that looks like

```json
"dependencies": {
  "electron": "^1.7.10"
}
```

We *are* going to make one change to this file, though. Replace the line

```json
"test": "echo \"Error: no test specified\" && exit 1"
```

with the line

```json
"electron": "electron ."
```

This will enable us to run our Electron app in the command line later with the command

```bash
npm run electron
```

### Let's... Actually Write Some Code!

Create a new file in your workspace directory called `index.js` (note that we use this specific name because it's specified with the `main` key in our `package.json` file)

Inside `index.js`, write:

```js
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', () => {
    let mainWindow = new BrowserWindow({});
});
```

Next, in the command line, run the command

```bash
npm run electron
```

You'll get a window that looks like this:

![Empty Electron app window](https://i.imgur.com/fCwvVT5.png)

Congrats! You've created an empty Electron app!

One fun thing to note is that since Electron runs your code in a Chromium window, you have access to Chromium functionality. Test it out! Click *View > Toggle Developer Tools* to access the same devtools you would find in Google Chrome.

To close your Electron app, return to the command line and hit <kbd>Ctrl+C</kbd> twice on Windows or <kbd>Cmd+C</kbd> twice on Mac.

### Dissecting the *Hello World*

It's important to understand what this code that we just put down is doing. We started with

```js
const electron = require('electron');
```

This is some Node witchcraft that gives us the module exported by the `electron` package. We receive this module and store it in the variable `electron`. The `electron` module will give us access to crucial objects such as `app` and classes such as `BrowserWindow`.

<br/>

```js
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
```

This provides some handy shorthand so we don't have to keep writing `electron.app` or `electron.BrowserWindow` and so forth.

If you're familiar with JavaScript's ES6 specs, you'll recognize this as destructuring, and you'll be able to use the more succinct shorthand

```js
const {app, BrowserWindow} = electron;
```

If you're not familiar with this syntax, don't worry about it.

<br/>

```js
app.on('ready', () => {
    // ...
});
```

JavaScript on the whole is a very event-driven language, meaning code is often executed in response to an event being dispatched, and Electron is no exception. The `app` object is responsible for handling the lifecycle events of the Electron application. One such default lifecycle event is the `'ready'` event, which is called when the app is being initialized. Here, we're telling the `app` object to wait for the `'ready'` event, and we're passing it a function (the contents of the `() => {}` bit) to execute when that `'ready'` event is dispatched.

<br/>

```js
let mainWindow = new BrowserWindow({});
```

This line initializes a new Chromium window (represented with the `BrowserWindow` class) that we call `mainWindow`.

### Loading HTML Documents

A blank application is pretty useless. Let's get `mainWindow` to load our `index.html` page:

```js
app.on('ready', () => {
    let mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
```

Run your Electron app again. This time, the window should display `index.html`:

![Electron app window with the contents of index.html](https://i.imgur.com/3UxqEcj.png)

<br/>

<center><h6><a href="https://github.com/OKStateACM/ElectronCodelab/blob/master/01%20-%20Getting%20Started.md">« 1. Getting Started</a> | <a href="https://github.com/OKStateACM/ElectronCodelab/blob/master/03%20-%20Menus%20and%20Multi-Window%20Functionality.md">3. Menus and Multi-Window Functionality »</a></h6></center>
