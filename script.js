
//GLOBAL URLS

const index_url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302"

const baseURL = "https://pokeapi.co/api/v2/"


let next_counter = 2
let prev_counter = 0
let pokemon_index = 1;



const getpokemonUrls = (pokemon_index, type = "") => {
    
    
    if (type === "") {
        return {
            species: `${baseURL}pokemon-species/${pokemon_index}`,
            pokemon: `${baseURL}pokemon/${pokemon_index}`,
            image: `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/official-artwork/${pokemon_index}.png`,
        };
    } else if (type === "species") {
        return `${baseURL}pokemon-species/${pokemon_index}`
    } else if (type === "pokemon") {
        return `${baseURL}pokemon/${pokemon_index}`
    }
    else if (type === "image") {
        return `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/official-artwork/${pokemon_index}.png`
    }
    
  };

//instead of obj - add second param - empty string to paramaterize the search of the obj

let pokemon_species_url = getpokemonUrls(pokemon_index,"species")
let pokemon_name_url = getpokemonUrls(pokemon_index,"pokemon")
let pokemon_img_url = getpokemonUrls(pokemon_index,"image")





let pokemon_next_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + next_counter.toString() + ".png"
let pokemon_prev_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + prev_counter.toString() + ".png"


function updateImageUrl() {
    if(prev_counter <= 0) {
        pokemon_prev_img_url = pokemon_img_url
    }
    if(prev_counter >= 1) {
        pokemon_prev_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + prev_counter.toString() + ".png"
    }
    else {
        pokemon_prev_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + prev_counter.toString() + ".png"
    }
    getpokemonUrls(pokemon_index,"species")
    pokemon_name_url = "https://pokeapi.co/api/v2/pokemon/" + pokemon_index.toString()
    pokemon_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon_index.toString() + ".png"
    pokemon_next_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + next_counter.toString() + ".png"
}

description_data = []
pokemon_names = []

pokemon_data = pokemon_species_url

async function pokemonCall(url){
    return (await fetch(url)).json()
}


function setData() {
    let div = this.document.getElementsByClassName("information")
    

    if (pokemon_index >= 0 ) {
        let text = pokemon_data.flavor_text_entries[0].flavor_text;
        div[0].append(text, div)
    }
    else {
        let text = pokemon_data.flavor_text_entries[0].flavor_text;
        div[0].append(text, div)
    }

}



async function updateData() {

    description_data = await pokemonCall(getpokemonUrls(pokemon_index,"species"))
    let div = this.document.getElementsByClassName("information")

    document.getElementsByClassName("information")[0].innerHTML = ''

    if (pokemon_index >= 0 ) {
        let text = description_data.flavor_text_entries[0].flavor_text;
        div[0].append(text, div)
    } 

}


function setName() {
    let name_plate = this.document.getElementsByClassName("name-plate")[0]

    let text_plate = this.document.createElement("name").innerHTML

    name_plate.append(pokemon_names[pokemon_index - 1].name, text_plate)
}

function updateName() {
    document.getElementsByClassName("name-plate")[0].innerHTML = ''
    
    let name_plate = this.document.getElementsByClassName("name-plate")[0]

    let text_plate = this.document.createElement("name")

    name_plate.append(pokemon_names[pokemon_index - 1].name, text_plate)
    

}




var next_img = document.getElementById("next-img")
var portrait_img = document.getElementById("portrait-img")
var prev_img = document.getElementById("prev-img")

function setImages() {
    portrait_img.src=pokemon_img_url
    next_img.src=pokemon_next_img_url
    prev_img.src=pokemon_img_url
    
}

function changeImages() {
    document.getElementById("next-img").src=pokemon_next_img_url
    document.getElementById("portrait-img").src=pokemon_img_url
    document.getElementById("prev-img").src=pokemon_prev_img_url
    
    
}


function alertbox() {
    window.alert("you hit back")
}


function prevImage(){
    if(pokemon_index <= 0 || next_counter <= 0 || prev_counter <=0 ) {
        pokemon_index = 1
        next_counter = 2
        prev_counter = 0
    }
    else {
        pokemon_index--;
        next_counter--;
        prev_counter--;
    }
    updateImageUrl();
    changeImages();
    updateName();
    updateData();
    return pokemon_index
}


function nextImage(){
    pokemon_index++;
    next_counter++
    prev_counter++;
    updateImageUrl();
    changeImages();
    updateName();
    updateData();
    
    return pokemon_index
}



document.addEventListener("DOMContentLoaded", async () => {


    pokemon_data = await pokemonCall(pokemon_species_url);
    pokemon_name_data = await pokemonCall(index_url)
    name_data = await pokemonCall(pokemon_name_url);

    for (var i = 0; i < pokemon_name_data.results.length; i++) {

        pokemon_names.push(pokemon_name_data.results[i])
        // description_data.push(pokemon_data)
    }

    setData()
    setImages()
    setName();

})
