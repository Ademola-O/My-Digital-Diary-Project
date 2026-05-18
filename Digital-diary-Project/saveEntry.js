// Saving Entries 

// 'document.querySelector()' searches the page for the first element that matches the specified 
// CSS selector. 
// '#titleInput' - finds the lement with id="titleInput"
//   ".save-btn" - finds the element with class="save-btn"
//   "textarea" - finds the first <textarea> element
const titleInput  = document.querySelector("#titleInput");
const contentArea = document.querySelector("#content");
const saveButton  = document.querySelector(".save-btn");
const entriesContainer = document.querySelector("#entriesContainer");

// addEventListener() watches an element and waits for something
// to happen (an "event"). When it does, it runs a function.
//
// Format:  element.addEventListener("event name", functionToRun)
//
// "click" is the event — it fires whenever the user clicks that element.
// The second argument is the function we want to run when that happens.
saveButton.addEventListener("click", function () {


    // .value reads whatever text is currently typed into an input
    // or textarea. It always returns a string.
    const title = titleInput.value;
    const text  = contentArea.value;

    // console.log() prints values to the browser's developer console.
    // Open it with F12 → Console tab. This is how you check your
    // code is reading the right things before saving them anywhere.
    console.log("Title captured:", title);
    console.log("Content captured:", text);

    // Saving to localStorage 
    // following code requires the entry to be filled for it to be saved
    // '.trim()' removes any whitespace from thr start and end of a string,
    // so that way even a title thats just spaces still comes back as empty.
    if (title.trim() === "" || text.trim() === "") {
        alert("Please fill in both a title and some content before saving.");
        return; // tells the function to stop here
    }

    // Build an 'entry object' - single unit of data with several named properties 
    // in this case thats: title, text, and date.
    const entry = {
        title: title,
        text: text, 
        date: new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long", 
            year: "numeric"
        })
    }

    // localStorage can only store strings — not arrays or objects.
    // So we first retrieve whatever is already saved, convert it
    // back into a real JavaScript array with JSON.parse(), then
    // add our new entry to it.
    //
    // '|| []' means: "if nothing is saved yet, start with an empty array"
    // so we never crash trying to .push() onto null.
    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    // .push() adds the new entry object onto the END of the array.
    entries.push(entry);

    // Now convert the whole array back into a string with JSON.stringify()
    // and save it. localStorage.setItem("key", value) always takes a string.
    localStorage.setItem("entries", JSON.stringify(entries));

    console.log("Entry saved! Total entries now:", entries.length);
    console.log("All entries:", entries);

    // Clear the form fields so the editor feels fresh after saving
    titleInput.value  = "";
    contentArea.value = "";

    // Re-render the right-hand panel so the new entry appears immediately
    displaySavedEntries();

    alert("Entry saved!");


});



//---------------------------------------------------------------------------------------------
// Sidebar Panel: code to show recently saved entries on the right panel                      ||
//---------------------------------------------------------------------------------------------

function displaySavedEntries() {

    // Guard clause: if this element doesn't exist on the current page, stop.
    if (!entriesContainer) return;

    const entries = JSON.parse(localStorage.getItem("entries")) || [];

    // Clear the panel before re-drawing so entries dont duplicate
    entriesContainer.innerHTML = "";

    if (entries.length === 0) {
        entriesContainer.innerHTML = '<p style="color:#aaa; font-size:13px; padding:16px;">No entries yet.</p>';
        return;
    }

    // Show the most recent 5 in the sidebar, newest first
    const recent = entries.slice(-5).reverse();

    recent.forEach(function (entry) {
        const item = document.createElement("div");
        item.style.cssText = "padding: 14px 16px; border-bottom: 1px solid #ececec;";

        item.innerHTML =
            '<small style="color:#aaa; font-size:11px; text-transform:uppercase; letter-spacing:1px;">' +
                entry.date +
            '</small>' +
            '<p style="font-weight:600; font-size:13px; color:#333; margin-top:4px;">' +
                entry.title +
            '</p>';

        entriesContainer.appendChild(item);
    });
}

// Run once on page load to populate the sidebar with any existing entries
document.addEventListener("DOMContentLoaded", displaySavedEntries);


