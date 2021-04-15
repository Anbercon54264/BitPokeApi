const API = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=00";

const getDatosPokemon = (API) => {
    return fetch(API)
        .then((response) => response.json())
        .then((json) => {
            llenarDatosPokemon(json),
                pokePaginacion(json);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

const llenarDatosPokemon = (json) => {
    let html = "";
    document.getElementById("datosPokemon").innerHTML = "";
    json.results.forEach((pokemon) => {
        const urlImgPokemon = pokemon.url;
        return fetch(urlImgPokemon)
            .then((response) => response.json())
            .then((json) => {
                cardsPokemosConImg(json, html);
            })
            .catch((error) => {
                console.log("Error2: ", error);
            });
    });
};
const cardsPokemosConImg = (jsonImg, html) => {
    html += '<div class="col mt-5">';
    html += '<div class="card" style="width: 10rem;">';
    html += `<img src="${jsonImg.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
    html += '<div class="card-body">';
    html += `<h5 class = "card-title" >${jsonImg.name}</h5>`;
    html += `<p class="card-text">Altura :${jsonImg.height}</p>`;
    html += `<p class="card-text">Peso :${jsonImg.weight}</p>`;
    html += "</div>";
    html += "</div>";
    html += "</div>";
document.getElementById("datosPokemon").innerHTML += html
};


const pokePaginacion = (jsonPag) => {
    let htmlPag = "";
    htmlPag += `<li class="page-item ${jsonPag.previous ? "" : "disabled"}"><a class="page-link" onclick="getDatosPokemon('${jsonPag.previous}')">Previous</a></li>`
    htmlPag += `<li class="page-item ${jsonPag.next ? "" : "disabled"}"><a class="page-link" onclick="getDatosPokemon('${jsonPag.next}')">Next</a></li>`
    document.getElementById("paginacion").innerHTML = htmlPag
};


getDatosPokemon(API);
