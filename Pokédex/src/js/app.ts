//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10

import Pokemon from './Pokemon'

let container = document.querySelector('.container') as HTMLDivElement

let searchButton = document.querySelector('.search-button') as HTMLButtonElement
let input = document.querySelector('.input') as HTMLInputElement
searchButton.addEventListener('click', () => {
 
  let list = getPokemonList('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151');
  list.then(value => {
    value.results.forEach((item: { name: string; url :string}) => {
      if(item.name === input.value){
        renderPokemon(item.url);
        input.value = ''; 
      }
    })
  })
}) 



let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';

async function getPokemonList(url: string){ 
  let pokemonList = await fetch(url)  
  let listData = await pokemonList.json();    
  return listData
}

async function renderPokemon(url: string) {
  let pokemons = await fetch(url);
  let data = await pokemons.json();
  let pokemon = new Pokemon(container, data);
}

let test = getPokemonList(url); 
test.then(value => console.log(value.results))    

