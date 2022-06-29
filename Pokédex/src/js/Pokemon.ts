export default class Pokemon {  
  parent: HTMLDivElement
  pokemonData: pokemon
  constructor(parent: HTMLDivElement, pokemonData: pokemon) {
    this.parent=parent;
    this.pokemonData=pokemonData;
    this.render(parent,pokemonData);
  }
  render(parent: HTMLDivElement, pokemonData: pokemon) {
    let pokemonElement = document.createElement("div");
    pokemonElement.innerHTML = `
    <div class="pokemon">
     <img src="${pokemonData.sprites.front_default}">
     <div class="name">${pokemonData.name}</div>
     <div class="heigth">Height: ${pokemonData.height}</div>
     <div class="weigth">Weigth: ${pokemonData.weight}</div>
     <div class="type">${pokemonData.types[0].type.name}</div>
    </div>
    `;  
    parent.appendChild(pokemonElement); 
  }
}

export interface pokemon{
  name: string;
  height: number;
  weight: number;
  types: [type];
  sprites: sprites
}

export interface sprites {
  front_default: string
}

export interface type{
  slot: number
  type: nameUrl
}

export interface nameUrl{
  name: string
  url: string
}