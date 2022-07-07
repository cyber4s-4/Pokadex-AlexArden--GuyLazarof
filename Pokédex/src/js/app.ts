import Pokemon from './Pokemon';

//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10

let container = document.querySelector(".container") as HTMLDivElement;
let input = document.querySelector(".input") as HTMLInputElement;
let paginationDiv = document.querySelector(".pagination") as HTMLDivElement;
let homePageDiv = document.querySelector(".homePage") as HTMLDivElement;
let homePageDiv2 = document.querySelector("#homePage2") as HTMLDivElement;
let mainEl = document.querySelector("main") as HTMLElement;


let tmp: any = []; 

// Get a list of pokemons from API
async function getPokemonList(url: string) {
  let pokemonList = await fetch(url);
  let listData = await pokemonList.json();
  return listData;
}

// Show searched pokemon or instead show error.
let searchButton = document.querySelector(
  ".search-button"
) as HTMLButtonElement;

searchButton.addEventListener("click", () => {
  // Fix container to contain one element
  container.style.width = "200px";
  container.style.position = "relative";
  container.style.left = "0";
  paginationDiv.style.display = "none";
  let pokemonsList = getPokemonList(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
  );
  let foundPokemon = false;
  pokemonsList.then((value) => {
    value.results.forEach((item: { name: string; url: string }) => {
      if (item.name === input.value.toLowerCase()) {
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
});

let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";

// Search by key down
input.addEventListener("keydown", () => {
  // Fix container to contain one element
  container.style.width = "200px";
  container.style.position = "relative";
  container.style.left = "0";
  paginationDiv.style.display = "none";
  let pokemonsList = getPokemonList(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
  );
  let foundPokemon = false;
  pokemonsList.then((value) => {
    value.results.forEach((item: { name: string; url: string }) => {
      if (item.name.includes(input.value.toLowerCase())) {
        container.innerHTML = "";
        renderPokemon(item.url);
        foundPokemon = true;
      } else {
        container.innerHTML = "";
      }
    });
  });
});

// Render pokemon
async function renderPokemon(url: string) {
  let pokemons = await fetch(url);
  let data = await pokemons.json();
  tmp.push(data);
  let pokemon = new Pokemon(container, data);
}

// Show all pokemons
let allPokemons = document.querySelector(".allPokemons") as HTMLDivElement;
allPokemons.addEventListener("click", () => {
  container.innerHTML = "";
  homePageDiv.style.display = "none";
  homePageDiv2.style.display = "none";
  // Fix container to contain three elements
  container.style.width = "600px";
  container.style.position = "absolute";
  container.style.left = "-110px";
  paginationDiv.style.display = "none";
  let pokemonList = getPokemonList(url);
  let list = getPokemonList(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
  );

  list.then((value) => {
    value.results.forEach((item: { url: string; name: string }) => {
      renderPokemon(item.url);
    });
    console.log(tmp); 
    
  });
});

// Home button functionality
let homeButton = document.querySelector(".homeButton") as HTMLDivElement;
homeButton.addEventListener("click", () => {
  location.href = "http://localhost:4000/";
});

// About button functionality
let aboutButton = document.querySelector(".aboutButton") as HTMLDivElement;
aboutButton.addEventListener("click", () => {
  searchButton.style.display = "none";
  paginationDiv.style.display = "none";
  input.style.display = "none";
  homePageDiv.style.display = "none";
  homePageDiv2.style.display = "none";
  let aboutContainer = document.createElement("div");
  aboutContainer.className = "aboutContainer";
  container.innerHTML = "";
  aboutContainer.innerHTML =
    "Hi we are Alex Arden and Guy Lazarof - we love pokemons! and we would like to spread that love to other people like you, feel free to share our website";
  container.appendChild(aboutContainer);
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

//pagination function
function pagination(num: number) {
  let pages: number = Math.ceil(num / 18);
  for (let i = 0; i < pages; i++) {
    let pageButton: HTMLButtonElement = document.createElement("button");
    pageButton.addEventListener(`click`, () => {
      container.innerHTML = "";
      container.style.width = "600px";
      container.style.position = "absolute";
      container.style.left = "-105px";
      paginationDiv.style.top = "1300px";
      homePageDiv.style.display = "none";
      homePageDiv2.style.display = "none";

      let list = getPokemonList(
        `https://pokeapi.co/api/v2/pokemon/?offset=${i * 18}&limit=18`
      );

      list.then((value) => {
        value.results.forEach((item: { url: string; name: string }) => {
          renderPokemon(item.url);
        });
      });
    });
    pageButton.innerHTML = `${i + 1}`;
    pageButton.className = "p-button";

    paginationDiv.appendChild(pageButton);
  }
}

pagination(162);
