// Dynamic Rendering for the Home Page 

document.addEventListener("DOMContentLoaded", function () {
    // First step is to retrieve the entries from localStorage
    // '//JSON.parse()' converts the saved string back into a real JS array.
    // If nothing is saved we use '[]' so the code below never crashes an empty diary.
    const allEntries = JSON.parse(localStorage.getItem("entries")) || [];

    // Next step is to find the grid sections we'll inject cards into
    // The home page has two grid sections: '.top-entries' and '.bottom-entries' 
    // the following code targets both so we can clear and refill them.
    const topSection = document.querySelector(".top-entries");
    const bottomSection = document.querySelector(".bottom-entries"); 

    // Next step is to clear the hard coded HTML cards
    // Currently only fake static example carda are being displayed.
    // We wipe them so only the saved cards show up
    topSection.innerHTML    = "";
    bottomSection.innerHTML = "";


    // Handling the empty state
    // If no entries have been saved yet, show a message in the
    // top section and stop — no point running the loop on nothing.
    if (allEntries.length === 0) {
        topSection.innerHTML =
            '<div class="empty-state">' +
                '<p>No entries yet. <a href="new-entry.html">Write your first one →</a></p>' +
            '</div>';
        return;
    }

    // Slice to only get the 5 most recent entries 
    // '.slice(-5)' takes the last 5 items from the array, negatve sicing was used because entries 
    // are pushedto the END (newest to last), so the last 5 are always the most recent.
    // '.reverse()' then flips the order so the newest appears first.
    //
    // using '.slice(0, 5)' which also works but it grabs the FIRST 5 (oldest). 
    // I used  '.slice(-5).reverse() to show the most recent entries first.
    const recentFive = allEntries.slice(-5).reverse();


    // Loop and inject cards into the two grid sections
    // Home page has two rows: top and bottom. 
    // Entries [0] and [1] go in the top row and [2]-[4] in the bottom

    recentFive.forEach(function (entry, index) {

        // 'document.createElement("div") creates a new <div> in memory which doesnt 
        // appear on the page until we 'appendChild()' it.
        const card = document.createElement("div");

        // code to alternate between large (.entry) and small (.small-entry) cards
        // to match the original two-column grid layout, 
        // index 0, 2, 4 - large; index 1, 3 - small
        const isLarge = index % 2 === 0;
        card.className = isLarge ? "entry" : "small-entry";

        // Build the card's inner.HTML using string concatenation. 
        // entry.date, entry.title, entry.text are the three properties we saved when the user 
        // clicked save entry.
        card.innerHTML =
            '<div class="date">' + entry.date + '</div>' +
            '<h3>' + entry.title + '</h3>' +
            '<p>' + entry.text + '</p>';


        // Place entries 0 and 1 in the top row, rest in bottom row
        if (index < 2) {
            topSection.appendChild(card);
        } else {
            bottomSection.appendChild(card);
        }

    });
});