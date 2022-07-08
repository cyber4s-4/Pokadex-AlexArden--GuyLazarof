import { render } from 'sass';
import Pokemon from './Pokemon';

//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10

let container = document.querySelector(".container") as HTMLDivElement;
let input = document.querySelector(".input") as HTMLInputElement;
let paginationDiv = document.querySelector(".pagination") as HTMLDivElement;
let homePageDiv = document.querySelector(".homePage") as HTMLDivElement;
let homePageDiv2 = document.querySelector("#homePage2") as HTMLDivElement;
let mainEl = document.querySelector("main") as HTMLElement;


let pokemonList: any = [];
getDataFromServer();

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

  // let pokemonsList = getPokemonList(
  //   "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
  // );
  fetch('http://localhost:3000/pokemons').then(data => data.json()).then(pokemons => 
    pokemons.forEach((pokemon: any) => {
      if(pokemon.name.includes(input.value)) {
        container.innerHTML = "";
        renderPokemon(pokemon); 
      } else {
        container.innerHTML = "";
      }
    })
  )
}); 
//   let foundPokemon = false;
//   pokemonsList.then((value) => {
//     value.results.forEach((item: { name: string; url: string }) => {
//       if (item.name.includes(input.value.toLowerCase())) {
//         container.innerHTML = "";
//         renderPokemon(item.url);
//         foundPokemon = true;
//       } else {
//         container.innerHTML = "";
//       }
//     });
//   });
// }); 

// Render pokemon 
async function renderPokemon(data: any) {
  let pokemon = new Pokemon(container, data);
}

// Show all pokemons from server
let allPokemons = document.querySelector(".allPokemons") as HTMLDivElement;

allPokemons.addEventListener("click", () => {

  container.innerHTML = "";
  homePageDiv.style.display = "none";
  homePageDiv2.style.display = "none";
  // Fix container to contain three elements
  container.style.width = "600px";
    

  pokemonList.forEach((pokemon: Pokemon) => {
    renderPokemon(pokemon); 
  });
})

// Home button functionality
let homeButton = document.querySelector(".homeButton") as HTMLDivElement;
homeButton.addEventListener("click", () => {
  location.href = "http://localhost:3000/";
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
  aboutContainer.innerHTML = `
    Hi we are Alex Arden and Guy Lazarof - we love pokemons!
    and we would like to spread that love to other people like you,
    feel free to share our website
    `;
  container.appendChild(aboutContainer);
});


// Pagination function
function pagination(num: number) {
  let pages: number = Math.ceil(num / 10);
  for (let i = 0; i < pages; i++) { 
    let pageButton: HTMLButtonElement = document.createElement("button");
    pageButton.innerHTML = `${i + 1}`;
    pageButton.className = "p-button";
    pageButton.addEventListener(`click`, () => {
      container.innerHTML = "";
      homePageDiv.style.display = "none";
      homePageDiv2.style.display = "none";
      // Fix container to contain three elements
      container.style.width = "600px";  
     for(let i = 0; i < 9; i++){
      renderPokemon(pokemonList[(Number(pageButton.innerHTML) - 1) * 9 + i])  
     }
    })
    paginationDiv.appendChild(pageButton);
  }
}

pagination(162);

// Helper functions
function showErrorMassage(container: HTMLDivElement, input: HTMLInputElement, massage: string) {
  container.innerHTML = "";
  let notExistsPokemon = document.createElement("div");
  notExistsPokemon.className = "notFound";
  notExistsPokemon.innerHTML = massage;
  container.appendChild(notExistsPokemon);
  input.value = "";
}

async function getDataFromServer() { 
  let dataFromServer = await fetch('http://localhost:3000/pokemons');
  dataFromServer.json().then(pokemons => {
    pokemons.forEach((pokemon: Pokemon) => {
      pokemonList.push(pokemon)
    })
  });
}