const API_KEY = "47fe8a3a";

const favouritesList = document.getElementById("fav-list");

// function that load items of favourite movies form localstorage
function loadItems(){
    const results = new Set(JSON.parse(localStorage.getItem("favourites")));
    if (results.length != 0) {
        favouritesList.innerHTML = "";
        results.forEach(async (imdbID) => {
          const movie = await getMovieById(imdbID);          
          const movieCard = document.createElement("div");
          movieCard.classList.add("tile");
          movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <p>${movie.Title}</p>
                <button class="fav-btn"> - Favourite </button>`;
          favouritesList.appendChild(movieCard);
          const favouriteButton = movieCard.querySelector(".fav-btn");
          favouriteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            removeFromFavourites(movie.imdbID);
          });
          movieCard.addEventListener("click", () => {
            window.location.href = `../pages/moviepage.html?id=${movie.imdbID}`;
          });
        });
      }else{
        favouritesList.innerHTML="No Favourites Found";
      }
}

// function that get the movie data
async function getMovieById(imdbID){
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
      );
      const results = await response.json();
      return results

}

// function that removes the imdbId form favouritesList in localStorage
function removeFromFavourites(imdbID){
  const items = new Set(JSON.parse(localStorage.getItem("favourites")));
  items.delete(imdbID);
  localStorage.setItem("favourites", JSON.stringify(Array.from(items)));
  this.loadItems();
}

// loads the cards of movies once the page renders
window.onload = () => {
    this.loadItems();
}