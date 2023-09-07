const API_KEY = "47fe8a3a";

async function search(){
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=Batman`);
    console.log(await response.json());
}

window.onload = () => {
    this.search();
}