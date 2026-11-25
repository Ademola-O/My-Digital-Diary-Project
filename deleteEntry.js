// Three-dot menu on Vault cards: click the dots, then choose Delete

// Removes any open menus from the page
function closeMenus() {
    document.querySelectorAll(".card-menu").forEach(function (menu) {
        menu.remove();
    });
}

// One click listener for the whole page (event delegation again)
document.addEventListener("click", function (event) {

    // CASE 1: the Delete button inside a menu was clicked
    const deleteBtn = event.target.closest(".card-menu button");
    if (deleteBtn) {
        deleteEntry(deleteBtn.closest(".card"));
        return;
    }

    // CASE 2: the three dots were clicked
    const dots = event.target.closest(".dots");
    if (dots) {
        const card = dots.closest(".card");
        if (!card) return;

        // If this card's menu is already open, clicking the dots closes it
        const alreadyOpen = card.querySelector(".card-menu");
        closeMenus();
        if (alreadyOpen) return;

        // Build the menu and put it under the dots
        const menu = document.createElement("div");
        menu.className = "card-menu";

        if (card.dataset.id) {
            // A real saved entry: show the Delete button
            const btn = document.createElement("button");
            btn.textContent = "Delete";
            menu.appendChild(btn);
        } else {
            // A demo card from the HTML: explain why it can't be deleted
            const note = document.createElement("p");
            note.className = "demo-note";
            note.textContent = "This is a demo card, so it can't be deleted.";
            menu.appendChild(note);
        }

        dots.closest(".card-top").appendChild(menu);
        return;
    }

        // Clicking inside the menu itself (like on the demo message) shouldn't close it
    if (event.target.closest(".card-menu")) return;

    // CASE 3: clicked anywhere else, so close any open menu
    closeMenus();
});

// Esc also closes the menu
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenus();
    }
});

function deleteEntry(card) {

    // Ask first, because deleting can't be undone
    const sure = confirm("Delete this entry? This can't be undone.");
    if (!sure) {
        closeMenus();
        return;
    }

    // The id we stored on the card with card.dataset.id (it comes back as text)
    const id = card.dataset.id;

    // Get all entries, keep every one EXCEPT the one with this id, save the result
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    const remaining = entries.filter(function (entry) {
        return String(entry.id) !== id;
    });
    localStorage.setItem("entries", JSON.stringify(remaining));

    // Remove the card from the page
    card.remove();

    // If that was the last saved entry, show the friendly empty message
    const container = document.getElementById("entriesContainer");
    if (container && container.children.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";

        const p = document.createElement("p");
        p.appendChild(document.createTextNode("No entries yet. "));

        const link = document.createElement("a");
        link.href = "new-entry.html";
        link.textContent = "Write your first one →";

        p.appendChild(link);
        empty.appendChild(p);
        container.appendChild(empty);
    }
}

// Label the hard-coded sample cards so users can tell they're demos.
// ".entries > .card" means cards sitting directly inside the entries section,
// which is where the HTML ones are. Your saved entries live inside
// #entriesContainer instead, so they don't get a label.
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".entries > .card").forEach(function (card) {
        const meta = card.querySelector(".meta");
        if (!meta) return;

        const label = document.createElement("span");
        label.className = "tag demo-tag";
        label.textContent = "Demo";
        meta.appendChild(label);
    });
});