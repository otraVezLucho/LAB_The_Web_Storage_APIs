

//Declara una función asíncrona que recibe una URL
async function obtenerPokemon(url){
    //Hace la petición y espera la respuesta del servidor
    const response = await fetch(url);
    //validar el resultado de la peticion
    //console.log(response);

    //convertir a JSON
    const data = await response.json();
    const getPokeName = data.name;
    const getPokeImage = data.sprites.front_default;
    return { getPokeName, getPokeImage };
}




let pokeName = "pikachu";
let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;  

obtenerPokemon(url).then(pokemon => {
    console.log(pokemon.getPokeName);   // → pikachu
    console.log(pokemon.getPokeImage);  // → URL de la imagen
});
