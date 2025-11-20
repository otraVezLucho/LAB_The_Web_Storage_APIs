let pokemonEncontrado = null;

function searchPokemon() {
    const nombre = document.getElementById("inputNombrePokemon").value.toLowerCase();    
    
    if (nombre === "") {
        alert("Escribe un nombre de Pokémon");
        return;
    }
    fetch("https://pokeapi.co/api/v2/pokemon/" + nombre)
        .then(function(response) {
            if (!response.ok) {
                alert("Pokémon no encontrado.");
                return null;
            }
            return response.json();
        })
        .then(function(data) {
            if (!data) return;

            pokemonEncontrado = {
                name: data.name,
                img: data.sprites.front_default
            };

            const resultado = document.getElementById("resultado");
            resultado.innerHTML = `
                <img src="${pokemonEncontrado.img}">
                <h2>${pokemonEncontrado.name}</h2>
            `;
        })
        .catch(function(error) {
            alert("Error en la búsqueda.");
        });
}

function saveFavorite() {
    if (!pokemonEncontrado) {
        alert("Primero busca un Pokémon.");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const repetido = favoritos.some(function(p) {
        return p.name === pokemonEncontrado.name;
    });

    if (repetido) {
        alert("Este Pokémon ya está en favoritos.");
        return;
    }

    favoritos.push(pokemonEncontrado);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    updateFavoritesList();
}

function updateFavoritesList() {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    const contenedor = document.getElementById("favoritos");
    contenedor.innerHTML = "";

    favs.forEach(p => {
        const div = document.createElement("div");
        div.className = "pokemon-card";
        div.innerHTML = `
            <img src="${p.img}" />
            <h3>${p.name}</h3>
        `;
        contenedor.appendChild(div);
    });
}
