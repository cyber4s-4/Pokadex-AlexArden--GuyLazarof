
import Pokemon from './Pokemon';

//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10

let container = document.querySelector(".container") as HTMLDivElement;
let input = document.querySelector(".input") as HTMLInputElement;
console.log(localStorage.pokemons); 

if(!localStorage.pokemons){  
  let list = getPokemonList(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
  );
  list.then(value => localStorage.setItem('pokemons', JSON.stringify(value)))   
}
    


// Show searched pokemon or instead show error.
let searchButton = document.querySelector('.search-button') as HTMLButtonElement;

searchButton.addEventListener("click", () => { 
  // Fix container to contain one element
  container.style.width = "200px"; 
  container.style.position = "relative";
  container.style.left = "0";

    let pokemonList = JSON.parse(localStorage.pokemons); 
    let foundPokemon = false; 
    pokemonList.results.forEach((item: { name: string; url: string }) => {
      if (item.name === input.value) {
        container.innerHTML = "";
        renderPokemon(item.url);
        input.value = "";
        foundPokemon = true;
      }
    });
    if (foundPokemon === false) {
      if (input.value === "") {
        showErrorMassage(
          container,
          input,
          `Please Enter A Pokemon Name! <img src="img/research.png" class="notFoundImg">`
        );
        return;
      }
      showErrorMassage(
        container,
        input,
        `<u>${input.value}</u> &nbsp Is Not A Pokemon <img src="img/research.png" class="notFoundImg">`
      );
    }
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

  // Fix container to contain three elements
  container.style.width = "600px";
  container.style.position = "absolute";
  container.style.left = "-110px";

  let pokemonList = getPokemonList(url);
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
function showErrorMassage(
  container: HTMLDivElement,
  input: HTMLInputElement,
  massage: string
) {
  container.innerHTML = "";
  let notExistsPokemon = document.createElement("div");
  notExistsPokemon.className = "notFound";
  notExistsPokemon.innerHTML = massage;
  container.appendChild(notExistsPokemon);
  input.value = "";
}
