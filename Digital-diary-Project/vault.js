// Wait for the document to fully load before running any code
// Same DOMContentLoaded pattern from saveEntry.js -
// Basically means 'run this function once the HTML is ready


document.addEventListener("DOMContentLoaded", function () {


    // Get all the container elements we'll inject the cards into 
    // 'document.getElementByID' looks through HTML for a specific element
    // 'entriesContainer' is the desired ID
    const entriesContainer = document.getElementById("entriesContainer");

    // Retrieve entries from localStorage
    //localStorage stores everything as a plain string
    //JSON.parse() converts that string back into a real JS array
    // The OR operator || means if theres nothing saved yet, use an empty array
    // So theres no crashes on a fresh install
    const allEntries = JSON.parse(localStorage.getItem("entries")) || [];

    // Give an id to any older entries that don't have one yet
    let changed = false;
    allEntries.forEach(function (entry, i) {
        if (!entry.id) {
            entry.id = Date.now() + i;   // + i keeps each one different
            changed = true;
        }
    });
    if (changed) {
        localStorage.setItem("entries", JSON.stringify(allEntries));
    }

    // Spread syntax '[...array]' creates a shallow copy before reversing, keeping 
    // newest-first order.
    const newestFirst = [...allEntries].reverse();


    // Clear the container 
    entriesContainer.innerHTML = "";


    // Show a message if theres no entries yet 
    // If the array is empty '(newestFirst.length === 0)', we inject a friendly empty state message 
    // and stop early with 'return' so the loop below doesnt run on an empty list.
    if (newestFirst.length === 0) {
        entriesContainer.innerHTML = 
            `<div class="empty-state">` +
                `<p>No entries yet. <a href="new-entry.html">Write your first one →</a></p>
            </div>`;
        return;
    }


    // Loop throughevery entry and create a card 
    // loop through newestFirst which contains the complete history. 
    // each card uses the .card class to match the vault's row layout.
    newestFirst.forEach(function (entry) {

        // 'createElement' builds the element in memeory first
        const card = document.createElement("div");
        card.className = "card";

        // stores the id on the card as data-id="..."
        card.dataset.id = entry.id;   

        // Top row: date on the left, dots on the right
        const cardTop = document.createElement("div");
        cardTop.className = "card-top";

        const meta = document.createElement("div");
        meta.className = "meta";

        const dateEl = document.createElement("span");
        dateEl.className = "vdate";
        dateEl.textContent = entry.date;

        const dots = document.createElement("div");
        dots.className = "dots";
        dots.textContent = "•••";

        meta.appendChild(dateEl);
        cardTop.appendChild(meta);
        cardTop.appendChild(dots);

        // Title and text
        const titleEl = document.createElement("h3");
        titleEl.textContent = entry.title;

        const textEl = document.createElement("p");
        textEl.textContent = entry.text;

        // Assemble the card
        card.appendChild(cardTop);
        card.appendChild(titleEl);
        card.appendChild(textEl);

            // 'appendChild places the finished card onto the page
            entriesContainer.appendChild(card);
    })

});
