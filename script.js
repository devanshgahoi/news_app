const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Save user preference (optional)
    const darkModeEnabled = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", darkModeEnabled);
}

// Check for user's dark mode preference on page load
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("change", toggleDarkMode);

    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    if (darkModeEnabled) {
        toggleDarkMode();
    }
});

function getTechNews() {
    // Replace with your desired API endpoint and any parameters you need
    const apiUrl = "https://newsapi.org/v2/everything?q=technology&apiKey=c312202bda99498898c204aa6bc74077";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the news data and update the cards-container
            const cardsContainer = document.getElementById("cards-container");
            cardsContainer.innerHTML = ""; // Clear existing content

            data.articles.forEach(article => {
                // Create a new card element for each article
                const card = document.createElement("div");
                card.classList.add("card");

                // Add necessary HTML elements and content for the card
                // (e.g., image, title, source, description)
                const title = document.createElement("h2");
                title.textContent = article.title;

                const description = document.createElement("p");
                description.textContent = article.description;
                if (article.urlToImage) {
                    const image = document.createElement("img");
                    image.src = article.urlToImage;
                    image.alt = article.title; // Use the article title as alt text
                    image.style.height = "150px"; // Set a fixed height for the image

                    card.appendChild(image);
                }
                // Append the title and description to the card
                card.appendChild(title);
                card.appendChild(description);

                // Append the card to the cards-container
                cardsContainer.appendChild(card);

                card.addEventListener("click", () => {
                    window.open(article.url, "_blank");
            });
        })
        .catch(error => {
            console.error("Error fetching tech news:", error);
            // Handle any errors gracefully, e.g., display an error message
        });
    })};