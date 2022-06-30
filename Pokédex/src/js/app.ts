import Pokemon from './Pokemon';

//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10
//TODO: make pokemons button render all pokemons.
//TODO: when searching pokemon render only searched pokemon.

let container = document.querySelector(".container") as HTMLDivElement;

let searchButton = document.querySelector(
  ".search-button"
) as HTMLButtonElement;
let input = document.querySelector(".input") as HTMLInputElement;
searchButton.addEventListener("click", () => {
  let list = getPokemonList(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
  );
  list.then((value) => {
    let check = false;
    value.results.forEach((item: { name: string; url: string }) => {
      if (item.name === input.value) {
        container.innerHTML = "";
        renderPokemon(item.url);
        input.value = "";
        check = true;
      }
    });
    if (check === false) {
      container.innerHTML = "";
      let notExistsPokemon = document.createElement("div");
      notExistsPokemon.className = "notFound";
      notExistsPokemon.innerHTML = `_<u>${input.value}</u>_ &nbsp is not a pokemon`;
      let img = document.createElement("img");

      img.src = "img/research.png";
      img.className = "notFoundImg";
      notExistsPokemon.appendChild(img);
      container.appendChild(notExistsPokemon);

      input.value = "";
    }
  });
});

let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";

async function getPokemonList(url: string) {
  let pokemonList = await fetch(url);
  let listData = await pokemonList.json();
  return listData;
}

async function renderPokemon(url: string) {
  let pokemons = await fetch(url);
  let data = await pokemons.json();
  let pokemon = new Pokemon(container, data);
}
let allPokemons = document.querySelector(".allPokemons") as HTMLDivElement;
allPokemons.addEventListener("click", () => {
  container.innerHTML = "";
  let pokemonList = getPokemonList(url);
  pokemonList.then((value) => console.log(value.results));

  let list = getPokemonList(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
  );
  list.then((value) => {
    value.results.forEach((item: { url: string; name: string }) => {
      renderPokemon(item.url);
    });
  });
});
let homeButton = document.querySelector(".homeButton") as HTMLDivElement;
homeButton.addEventListener("click", () => {
  container.innerHTML = "";
});
