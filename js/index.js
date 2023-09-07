const API_KEY = "47fe8a3a";

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
const searchResults = document.getElementById("results");

// search function that searches the seach results
async function search() {
  const input = searchInput.value;
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${input}`
  );
  const results = await response.json();
  if (results.Search) {
    appendResults(results.Search);
  } else {
    searchResults.innerHTML = "";
  }
}

// function that adds movie cards inside movies container
function appendResults(results) {
  if (results.length != 0) {
    searchResults.innerHTML = "";
    results.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("tile");
      movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p>${movie.Title}</p>
            <button class="fav-btn"> + Favourite </button>`;
      searchResults.appendChild(movieCard);
      const favouriteButton = movieCard.querySelector(".fav-btn");
      if (localStorage.getItem("favourites")) {
        const items = new Set(JSON.parse(localStorage.getItem("favourites")));
        if (items.has(movie.imdbID)) {
          favouriteButton.classList.add("button-active");
          favouriteButton.innerHTML = " - Favourite ";
        }
      }
      favouriteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const items = new Set(JSON.parse(localStorage.getItem("favourites")));
        if (items.has(movie.imdbID)) {
          removeFromFavourites(movie.imdbID);
          favouriteButton.classList.remove("button-active");
          favouriteButton.innerHTML = " + Favourite ";
        } else {
          addToFavourites(movie.imdbID);
          favouriteButton.classList.add("button-active");
          favouriteButton.innerHTML = " - Favourite ";
        }
      });
      movieCard.addEventListener("click", () => {
        window.location.href = `pages/moviepage.html?id=${movie.imdbID}`;
      });
    });
  }
}


// function that adds favourite movies to localstorage
function addToFavourites(title) {
  if (localStorage.getItem("favourites")) {
    const items = new Set(JSON.parse(localStorage.getItem("favourites")));
    items.add(title);
    localStorage.setItem("favourites", JSON.stringify(Array.from(items)));
  } else {
    const myFavSet = new Set();
    myFavSet.add(title);
    localStorage.setItem("favourites", JSON.stringify(Array.from(myFavSet)));
  }
}

// function that removes favourite movies to localstorage
function removeFromFavourites(title) {
  const items = new Set(JSON.parse(localStorage.getItem("favourites")));
  items.delete(title);
  localStorage.setItem("favourites", JSON.stringify(Array.from(items)));
}

//search key handlers
searchInput.addEventListener("keyup", search);
searchButton.addEventListener("click", search);
