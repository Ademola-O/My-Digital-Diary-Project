// Highlights the nav link for the page you're currently on
document.addEventListener("DOMContentLoaded", function () {

    // window.location.pathname is the page address, e.g. "/vault.html"
    // .split("/").pop() takes just the last part: "vault.html"
    // If it's empty (the site's root), we treat it as the home page.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Loop through every nav link and compare its href to the current page
    document.querySelectorAll(".nav-link").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});