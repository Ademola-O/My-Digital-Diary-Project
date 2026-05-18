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

        // 'innerHTML' fills the card's content using the saved data
        card.innerHTML =
        `<div class="card-top">
                <div class="meta">
                    <span class="vdate">${entry.date}</span>
                </div>
                <div class="dots">•••</div> 
            </div>
            <h3>${entry.title}</h3> 
            <p>${entry.text}</p>`;

            // 'appendChild places the finished card onto the page
            entriesContainer.appendChild(card);
    })

});
