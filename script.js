
//GLOBAL URLS

let index_url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150"
let next_counter = 2

let prev_counter = 0

var pokemon_index = 1;

let pokemon_species_url = "https://pokeapi.co/api/v2/pokemon-species/" + pokemon_index.toString(); 

let pokemon_name_url = "https://pokeapi.co/api/v2/pokemon/" + pokemon_index.toString() 

let pokemon_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon_index.toString() + ".png"

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
    pokemon_species_url = "https://pokeapi.co/api/v2/pokemon-species/" + pokemon_index.toString(); 
    pokemon_name_url = "https://pokeapi.co/api/v2/pokemon/" + pokemon_index.toString()
    pokemon_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon_index.toString() + ".png"
    pokemon_next_img_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + next_counter.toString() + ".png"
}

// let pokemon_data = []

// pokemon = DATA[0].results

// pokemon_names = []

// console.log(pokemon)


//let ivy_name = pokemon_names[1]



//name_plate.append(pokemon_names[1], text_plate )
// const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/1");
// var pokemon_data = await response.json();
// console.log(pokemon_data)


description_data = []
pokemon_names = []

pokemon_data = pokemon_species_url

async function pokemonCall(url){
    return (await fetch(url)).json()
}


function setData() {
    let div = this.document.getElementsByClassName("information")
    

    if (pokemon_index >= 0 ) {
        pokemon_index = 1
        let text = pokemon_data.flavor_text_entries[1].flavor_text;
        div[0].append(text, div)
    }
    else {
        let text = pokemon_data.flavor_text_entries[1].flavor_text;
        div[0].append(text, div)
    }

}



function updateData() {
    let div = this.document.getElementsByClassName("information")

    document.getElementsByClassName("information")[0].innerHTML = ''

    if (pokemon_index >= 0 ) {
        pokemon_index = 1
        let text = pokemon_data.flavor_text_entries[1].flavor_text;
        div[0].append(text, p)
    }
    else {
        let text = pokemon_data.flavor_text_entries[1].flavor_text;
        div[0].append(text, p)
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
    prev_img.src=pokemon_prev_img_url

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
    updateImageUrl()
    changeImages();
    updateName()
    console.log(pokemon_index)
    // var img = document.getElementsById("portrait-img")
    // img.src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
    //window.alert("hit")
    return pokemon_index
}


function nextImage(){
    pokemon_index++;
    next_counter++
    prev_counter++;
    updateImageUrl()
    changeImages();
    updateName();
    
    // updateData();



    // updateData(description_data);
    // console.log(pokemon_index)
    // console.log(pokemon_data)
    // var img = document.getElementsById("portrait-img")
    // img.src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
    //window.alert("hit")
    return pokemon_index
}


    // console.log(text)
    

document.addEventListener("DOMContentLoaded", async () => {
    pokemon_data = await pokemonCall(pokemon_species_url);
    pokemon_name_data = await pokemonCall(index_url)
    name_data = await pokemonCall(pokemon_name_url);
    console.log(name_data.name)
    console.log(pokemon_name_data.results)
    console.log(pokemon_data.flavor_text_entries[1])
    for (var i = 0; i < pokemon_name_data.results.length; i++) {
        //console.log(pokemon[i].name)
        //pokemon_names.push(pokemon[i].name)
        pokemon_names.push(pokemon_name_data.results[i])
        description_data.push(pokemon_data.flavor_text_entries[1])
    }

    // console.log(pokemon_data.flavor_text_entries)
    setData(description_data)
    setImages()
    setName();

    // console.log(description_data)
})


// const element = description_data[0]