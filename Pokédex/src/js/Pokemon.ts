export default class Pokemon {
  parent: HTMLDivElement;
  pokemonData: pokemon;
  constructor(parent: HTMLDivElement, pokemonData: pokemon) {
    this.parent = parent;
    this.pokemonData = pokemonData;
    this.render(parent, pokemonData);
  }
  render(parent: HTMLDivElement, pokemonData: pokemon) {
    let pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    let type = pokemonData.types[0].type.name;
    let typeImg: string = ``;
    if (type === `bug`) {
      typeImg = "/img/ladybug.png";
    } else if (type === `water`) {
      typeImg = `/img/water-drop.png`;
    } else if (type === `poison`) {
      typeImg = `/img/virus.png`;
    } else if (type === `electric`) {
      typeImg = `/img/lightning.png`;
    } else if (type === `fire`) {
      typeImg = `/img/fire.png`;
    } else if (type === `rock`) {
      typeImg = `/img/rock.png`;
    } else if (type === `ice`) {
      typeImg = `/img/snowflake.png`;
    } else if (type === `grass`) {
      typeImg = `/img/grass.png`;
    } else if (type === `fighting`) {
      typeImg = `/img/fight.png`;
    } else if (type === `fairy`) {
      typeImg = `/img/fairy.png`;
    } else if (type === `dragon`) {
      typeImg = `/img/dragon.png`;
    } else if (type === `normal`) {
      typeImg = `/img/popular.png`;
    } else if (type === `psychic`) {
      typeImg = `/img/crystal-ball.png`;
    } else if (type === `ground`) {
      typeImg = `/img/dunes.png`;
    } else {
      typeImg = `?`;
    }
    // if ( type.innerHTML ===ground) {
    //   type
    // }
    pokemonDiv.innerHTML = `
     <img src="${pokemonData.sprites.front_default}">
     <div class="name">${pokemonData.name}</div>
     <div class="heigth">Height: ${pokemonData.height / 10} meter</div>
     <div class="weigth">Weigth: ${pokemonData.weight / 10} kg</div>
     <div class="type"><img src="${typeImg}" />${type} </div>
    `;
    parent.appendChild(pokemonDiv);
  }
}

export interface pokemon {
  name: string;
  height: number;
  weight: number;
  types: [type];
  sprites: sprites;
}

export interface sprites {
  front_default: string;
}

export interface type {
  slot: number;
  type: nameUrl;
}

export interface nameUrl {
  name: string;
  url: string;
}
