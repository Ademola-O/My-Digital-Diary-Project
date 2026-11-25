# My Digital Diary

A multi-page journaling website built with HTML, CSS and vanilla JavaScript. Write entries, browse them in a vault, open any entry in a pop-up, and delete the ones you no longer want. Everything is saved in the browser, so there is nothing to install and no sign-up.


**Live demo:** (https://ademola-o.github.io/My-Digital-Diary-Project/)

## Features

- **Write entries:** add a title and your thoughts on the New Entry page. Empty entries are rejected with a clear message.
- **Saved in your browser:** entries are stored in `localStorage` and are still there after you close the tab.
- **Home page:** shows your five most recent entries, newest first, in an alternating large and small card layout.
- **Vault:** lists every entry you have ever saved, newest first.
- **Recent entries panel:** the New Entry page shows your latest entries beside the editor and updates as soon as you save.
- **Pop-up view:** click any card to read it in the centre of the screen. Close it with the × button, by clicking the background, or by pressing Esc.
- **Delete with confirmation:** click the three dots on a card, choose Delete and confirm. The entry is removed from storage and from every page.
- **Demo cards:** the sample cards on the Vault page are labelled "Demo", and the dots menu explains that they can't be deleted.
- **Discard button:** clears the editor, with a confirmation if you have typed something.
- **Active page indicator:** the navigation underline stays under the page you are currently on.
- **Responsive design:** works on desktop, tablet and mobile.

## Built with

- HTML5
- CSS3: flexbox, grid, hover transitions and media queries
- JavaScript (no frameworks or libraries)
- Browser `localStorage`
- Google Fonts (Inter)

## Project structure

```
index.html          Home page
new-entry.html      Writing page
vault.html          Archive of all entries
about.html          About page (shell)
collections.html    Collections page (shell)
entries.html        Entries page (shell)

style.css           Styles for every page
saveEntry.js        Saves entries, discard button, recent entries panel
index.js            Builds the home page cards
vault.js            Builds the Vault cards and gives older entries an id
cardModal.js        Click-to-open pop-up for cards
deleteEntry.js      Three-dot menu, delete, and Demo labels
nav.js              Keeps the underline on the current page
```

## Running it locally

There is no build step.

1. Clone the repository:
   ```
   git clone https://github.com/Ademola-O/My-Digital-Diary-Project.git
   ```
2. Open the folder and double-click `index.html`, or open it with the Live Server extension in VS Code.

## How it works

1. On the New Entry page, `saveEntry.js` checks that the title and text are filled in, then builds an entry object with a unique `id`, a title, the text and the date.
2. The entry is added to an array, converted to text with `JSON.stringify` and stored in `localStorage` under the key `entries`.
3. The home page, Vault and side panel read that array back with `JSON.parse`, loop through it and build a card for each entry.
4. Deleting filters the entry's `id` out of the array, saves the result and removes the card from the page.

## Security note

User input is always added to the page with `textContent` and `createElement`, never `innerHTML`, so anything typed into an entry is displayed as plain text and can't run as code. I found and fixed this after testing my own app with an `<img onerror>` payload.

## Known limitations

- Entries live only in the browser they were written in. Clearing browser data deletes them, and they don't sync between devices.
- There are no accounts or encryption, so this is not a private or secure place for sensitive writing yet.
- The Insert Memory, Private and tag buttons on the New Entry page are placeholders for planned features.
- The About, Collections and Entries pages are not built yet.

## Roadmap

- [ ] Move storage to a real database with user logins
- [ ] Edit existing entries
- [ ] Working tags, plus search and filter
- [ ] Collections page
- [ ] Image attachments ("Insert Memory")
- [ ] Private entries
- [ ] Export entries

## What I learned

- Working with `localStorage` and converting data with `JSON.parse` and `JSON.stringify`
- Building page content dynamically with `createElement`
- Event delegation: one listener on the document handles clicks on cards that are created later
- Giving records unique ids so deletes remove the right item, whatever order they are displayed in
- Preventing cross-site scripting by treating user input as text, not HTML
- Planning for edge cases such as empty states, demo content and confirmation before destructive actions

## Author

Ademola Okesanjo ([GitHub](https://github.com/Ademola-O) · [LinkedIn](https://www.linkedin.com/in/ademola-o-400802130/))
