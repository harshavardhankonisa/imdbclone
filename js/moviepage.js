const API_KEY = "47fe8a3a";

const card = document.getElementById("card");

// function that imdbID of the element clicked on homepage and searches for the results
async function searchContent(id) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
  );
  const results = await response.json();
  if (results.Response !== "False") {
    this.loadContent(results);
  } else {
    card.innerHTML = "";
  }
}

// functions that renders the resultant movie to main container
function loadContent(results) {
  card.innerHTML = `
    <img src="${results.Poster}">
    <div class="details">
        <h1>${results.Title}</h1>
        <hr>
        <br>
        <p>Plot: ${results.Plot}</p>
    </div>
    `;
}

//fetches the imdbId of the element that has been clicked upon and searches for that upon windows load
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const imdbID = urlParams.get("id");
  this.searchContent(imdbID);
};
