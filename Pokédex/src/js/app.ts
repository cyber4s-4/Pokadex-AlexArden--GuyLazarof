//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10

import Pokemon from './Pokemon'

let container = document.querySelector('.container') as HTMLDivElement

let searchButton = document.querySelector('.search-button') as HTMLButtonElement

let url = 'https://pokeapi.co/api/v2/pokemon/pikachu';

async function getPokemonList(){
  let pokemonList = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9')  
  let listData = await pokemonList.json();    
  
  listData.results.forEach((item: { url: string; })  => {
    fetchPokemon(item.url)
  })

}


async function fetchPokemon(url: string) {
  let pokemons = await fetch(url); 
  let data = await pokemons.json();  
    
  let pokemon = new Pokemon(container, data) 
    
}

getPokemonList();
// fetchPokemon(url);  
 