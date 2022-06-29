export class Pokemon {
  item: Pokemon;
  constructor(item: Pokemon, parentEl: HTMLElement) {
    this.item = item;
    this.render(parentEl);
  }
  render(parentEl: HTMLElement) {
    let divPokemon = document.createElement("div");
    divPokemon.className = "pokemon";

    //photo
    let divPhoto = document.createElement("div");
    divPhoto.className = "photo";
    let img = document.createElement("img");
    img.src = this.item.img;
    divPhoto.appendChild(img);
    divPro.appendChild(divPhoto);

    //specs:
    let divSpecs = document.createElement("div");
    divSpecs.className = "specs";

    //specs:title
    let divTitle = document.createElement("div");
    divTitle.className = "title";
    divTitle.innerHTML = "<b>Our Product:</b> " + this.item.title;
    divSpecs.appendChild(divTitle);

    //specs:brand
    let divBrand = document.createElement("div");
    divBrand.className = "brand";
    divBrand.innerHTML = "<b>Brand:</b> " + this.item.specs.brand;
    divSpecs.appendChild(divBrand);

    //specs:memory
    let divMemory = document.createElement("div");
    divMemory.className = "memory";
    divMemory.innerHTML = "<b>Memory:</b> " + this.item.specs.memory;
    this.item.specs.memory;
    divSpecs.appendChild(divMemory);

    //specs:ram
    let divRam = document.createElement("div");
    divRam.className = "ram";
    divRam.innerHTML = "<b>Ram:</b> " + this.item.specs.ram;
    divSpecs.appendChild(divRam);

    //specs:resolution
    let divResolution = document.createElement("div");
    divResolution.className = "resolution";
    divResolution.innerHTML =
      "<b>Resolution:</b> " + this.item.specs.resolution;
    divSpecs.appendChild(divResolution);

    //specs:id
    let divId = document.createElement("div");
    divId.className = "id";
    divId.innerHTML = "<b>Id:</b> " + this.item.id;
    divSpecs.appendChild(divId);

    divPro.appendChild(divSpecs);

    // price+logo
    let divPriceLogo = document.createElement("div");
    divPriceLogo.className = "price_logo";

    //logo
    let divLogo = document.createElement("div");
    divLogo.className = "logo";
    let logo = document.createElement("img");
    logo.src = this.item.companyLogo;
    divLogo.appendChild(logo);
    divPriceLogo.appendChild(divLogo);

    // price
    let divPrice = document.createElement("div");
    divPrice.className = "price";
    divPrice.innerHTML = `<b>${this.item.price}${this.item.currency}</b>`;
    divPriceLogo.appendChild(divPrice);

    divPro.appendChild(divPriceLogo);
    parentEl.append(divPro);
  }
}
