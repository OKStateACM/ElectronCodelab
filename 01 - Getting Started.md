# 1. Getting Started

### Installing Node and npm

Electron is a JavaScript framework that uses the Node runtime environment. We'll cover Node more in-depth during our *Back-End Development with Node and Express* codelab on February 14, but in short, Node was developed to run JavaScript outside of the browser. Node also comes with a handy package manager called npm, which is what we'll use to get the `electron` library.

#### *Install Node and npm by going to [nodejs.org/en/download](https://nodejs.org/en/download/)*

When you have finished installing Node, test that it works by going to your command line and entering the command

```bash
node -v
```

If you get a version number in response, you're good to go!

### Getting the Necessary HTML Files

Electron was developed to allow programmers to use existing and familiar webdev technologies like HTML and CSS to create desktop applications. It is not the goal of this codelab to teach these webdev technologies, but you can read [our notes on HTML and CSS here](https://github.com/OKStateACM/MeetingNotes/blob/master/2016-2017/spring2017/02-01%20-%20HTML%20and%20CSS.md).

To keep us from getting into the weeds of webdev and to allow us to focus on what makes Electron tick, some HTML files with minimal functionality have already been created. These can be found in this repository under [the `resources/` folder](https://github.com/OKStateACM/ElectronCodelab/tree/master/resources).

If you're already familiar with Git, feel free to get these resources by cloning this repository. Otherwise, you can just download the repository by going to the root of the repository ([github.com/OKStateACM/ElectronCodelab](https://github.com/OKStateACM/ElectronCodelab)) and clicking the green **Clone or download** button, followed by **Download ZIP**.

![Screenshot of the "Clone or download" dialog with the "Download ZIP" button highlighted](https://support.sellbrite.com/hc/en-us/article_attachments/216063688/download-zip.png)

You'll get the whole repository, but we just need `resources/index.html` and `resources/add.html`. Drag those two files to a new, easily accessible folder that you'll use as your workstation.

### Understanding `index.html` and `add.html`

Open `index.html` and `add.html` in your browser to see what's already been made.

![index.html](https://i.imgur.com/Bjou1D9.png)

<br/>

`index.html` serves as the main page for our todo application. Currently, it displays three hardcoded todos, as well as red buttons that, when clicked, will remove the todo from the list.

If you look at the HTML code, you'll see that the page has an HTML `table` element, as well as some premade scripts. The todos are to be stored as strings in a `todos` array. These strings can be added to `todos` via the `addItem()` function. The `loadTable()` function populates the HTML table with the elements of the `todos` array, and gives each element a button that, when clicked, calls `removeItem()` with the index of that element in the array. `removeItem()` removes that element from `todos`, and then calls `loadTable()` so the HTML reflects the changes.

![add.html](https://i.imgur.com/fHOhTOL.png)

<br/>

`add.html` is a basic HTML form. It contains an `input` element with the ID `todoName`, and a *Submit* button. Currently, the form submission's default action of refreshing is prevented.

Note that, although we're focusing on what makes Electron tick in this codelab and abstracting away the webdev stuff, the vast majority of Electron development will be using the webdev technologies to produce the desired functionality.

<br/>

<center><h6><a href="https://github.com/OKStateACM/ElectronCodelab/blob/master/02%20-%20Creating%20an%20Electron%20App.md">2. Creating an Electron App »</a></h6></center>
