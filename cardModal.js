// Click any entry card to open it in the centre of the screen

// Listen for clicks anywhere on the page
document.addEventListener("click", function (event) {

    // Clicks on the three dots or their menu shouldn't open the pop-up
    if (event.target.closest(".dots, .card-menu")) return;

    // .closest() looks at what was clicked, then walks UP through its parents
    // until it finds one matching these classes. If none match, it gives null.
    const card = event.target.closest(".entry, .small-entry, .card");

    // If the click wasn't on (or inside) a card, do nothing
    if (!card) return;

    openModal(card);
});

function openModal(card) {

    // 1. The dark background that covers the screen
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    // 2. The white box in the middle, filled with a copy of the card's content
    const box = document.createElement("div");
    box.className = "modal-card";

    // Copy the card's contents as real page elements (no re-reading as HTML)
    Array.from(card.childNodes).forEach(function (child) {
        box.appendChild(child.cloneNode(true));
    });

    // Remove the dots from the pop-up copy
    box.querySelectorAll(".dots, .card-menu").forEach(function (el) {
        el.remove();
    });

    // 3. The little X in the corner
    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.setAttribute("aria-label", "Close");

    // 4. Put the pieces together and show them on the page
    box.appendChild(closeBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Stop the page behind from scrolling while the pop-up is open
    document.body.style.overflow = "hidden";

    // Function that closes everything and tidies up
    function closeModal() {
        overlay.remove();
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKeyDown);
    }

    // Close when Esc is pressed
    function onKeyDown(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    }

    // Close when the X is clicked
    closeBtn.addEventListener("click", closeModal);

    // Close when the dark background is clicked (but not the white box)
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", onKeyDown);
}