const API_KEY = "47fe8a3a";

const card = document.getElementById("card");

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

function loadContent(results) {
  card.innerHTML = `
    <img src="${results.Poster}">
    <div class="details">
        <h1>${results.Title}</h1>
        <hr>
        <br>
        <p>Plot:${results.Plot}</p>
    </div>
    `;
}

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const imdbID = urlParams.get("id");
  this.searchContent(imdbID);
};
