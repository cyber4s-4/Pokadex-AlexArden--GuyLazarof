export default class Pokemon {
  parent: HTMLDivElement;
  pokemonData: pokemon;
  constructor(parent: HTMLDivElement, pokemonData: pokemon) {
    this.parent = parent;
    this.pokemonData = pokemonData;
    this.render(parent, pokemonData);
  }
  render(parent: HTMLDivElement, pokemonData: pokemon) {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');
    const type = pokemonData.types[0]; 
    const typeImg = `/img/${type}.png`;
    pokemonDiv.innerHTML = `
     <img src="${pokemonData.image}">   
     <div class="name">${pokemonData.name}</div>
     <div class="heigth">Height: ${pokemonData.height / 10} meter</div>
     <div class="weigth">Weigth: ${pokemonData.weight / 10} kg</div>
     <div class="type"><img src="${typeImg}" />${type}</div>
    `;
    parent.appendChild(pokemonDiv);
  }
}

export interface pokemon {
  name: string;
  height: number;
  weight: number;
  types: [type];
  image: string; 
}

export interface sprites {
  image: string;
}

export interface type {
  slot: number;
  type: nameUrl;
}

export interface nameUrl {
  name: string;
  url: string;
}
