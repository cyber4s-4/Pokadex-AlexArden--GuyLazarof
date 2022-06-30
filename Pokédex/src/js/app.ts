import Pokemon from './Pokemon';

//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10

let container = document.querySelector(".container") as HTMLDivElement;

// Show searched pokemon or instead show error.
let searchButton = document.querySelector(
  ".search-button"
) as HTMLButtonElement;
let input = document.querySelector(".input") as HTMLInputElement;
searchButton.addEventListener("click", () => {
  let list = getPokemonList(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
  );
  list.then((value) => {
    let foundPokemon = false;
    value.results.forEach((item: { name: string; url: string }) => {
      if (item.name === input.value) {
        container.innerHTML = "";
        renderPokemon(item.url);
        input.value = "";
        foundPokemon = true;
      }
    });
    if (foundPokemon === false) {
      if (input.value === '') {
        showErrorMassage(container, input, 'Please Enter A Pokemon Name!')
        return
      }
      showErrorMassage(container, input, `<u>${input.value}</u> &nbsp Is Not A Pokemon`)
    }
  });
});

let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";

// Get a list of pokemons
async function getPokemonList(url: string) {
  let pokemonList = await fetch(url);
  let listData = await pokemonList.json();
  return listData;
}

// Render pokemon
async function renderPokemon(url: string) {
  let pokemons = await fetch(url);
  let data = await pokemons.json();
  let pokemon = new Pokemon(container, data);
}

// Show all pokemons
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

// Home button functionality
let homeButton = document.querySelector(".homeButton") as HTMLDivElement;
homeButton.addEventListener("click", () => {
  container.innerHTML = "";
});


// Helper functions
function showErrorMassage(container: HTMLDivElement, input: HTMLInputElement, massage: string) {
  container.innerHTML = "";
  let notExistsPokemon = document.createElement("div");
  notExistsPokemon.className = "notFound";
  notExistsPokemon.innerHTML = massage;
  container.appendChild(notExistsPokemon);
  input.value = "";
}

