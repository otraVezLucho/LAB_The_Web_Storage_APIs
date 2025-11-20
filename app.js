function saveFavorite() {
    if (!currentPokemon) return alert("Primero busca un Pokémon");

    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favs.some(p => p.name === currentPokemon.name)) {
        favs.push(currentPokemon);
        localStorage.setItem("favoritos", JSON.stringify(favs));
        updateFavoritesList();
    } else {
        alert("Este Pokémon ya está en favoritos");
    }
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

updateFavoritesList();