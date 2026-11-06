
const sidebar = document.getElementById("sidebar");
const searchInput = document.getElementById("search");

// Open and close the navigation menu on mobile
function toggleSidebar() {
  sidebar.classList.toggle("open");
}

// Close mobile menu when a navigation link is clicked
document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});

// Highlight the current section in the sidebar
const sections = document.querySelectorAll(
  "main section[id]"
);

const navigationLinks = document.querySelectorAll(
  ".sidebar a"
);

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach((section) => {
    if (
      window.scrollY >=
      section.offsetTop - 150
    ) {
      currentSection = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// Live search across website sections and cards
searchInput.addEventListener("input", () => {
  const query = searchInput.value
    .trim()
    .toLowerCase();

  document.querySelectorAll(".searchable").forEach((section) => {
    const matches = section.textContent
      .toLowerCase()
      .includes(query);

    section.classList.toggle("hidden", !matches);
  });

  // Keep the dashboard visible when searching
  document.getElementById("home").classList.remove("hidden");
});

// Search result: clear the query to show everything again
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
  }
});
