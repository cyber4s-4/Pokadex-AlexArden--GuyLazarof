//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100

import { render } from "sass"

async function fetchPokemon(){
  let pokemons = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')  
  let data = await pokemons.json().then(console.log) 

 
}

fetchPokemon()
 