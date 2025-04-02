import { displayManga, displayAnime, displayCharacter } from "./functions.js";
import { mangaByTitle, animeByTitle, characterByName, queryById } from "./queries.js";

let URL = 'https://graphql.anilist.co';

//para el fetch con GET
async function fetchData(query,variables) {
    
    let OPTIONS = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query, //query introducida, en la parte superior tenemos las diferentes posibilidades
            variables: variables //Variables y valores utilizados en la busqueda (search, id, etc.)
        })
    };

    try {
        const response = await fetch(URL, OPTIONS).then(handleResponse)
                            .then(handleData)
                            .catch(handleError);
        return response;
    }
    catch(error) {
        console.error(error);
    }
}

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    return data;
}

function handleError(error) {
    //alert('Error, check console');
    console.error(error);
}

async function getMangaByTitle(title) { //Función para obtener los mangas del titulo que se ha escrito
    let variables ={
        search: title
    };
    const result = await fetchData(mangaByTitle, variables);
    displayManga(result.data.Page.media);
}

async function getAnimeByTitle(title) { //Función para obtener los animes del titulo que se ha escrito
    let variables ={
        search: title
    };
    const result = await fetchData(animeByTitle, variables);
    displayAnime(result.data.Page.media);
}

async function getCharacterByName(name) { //
    let variables ={
        search: name
    };
    const result = await fetchData(characterByName, variables);
    displayCharacter(result.data.Page.characters);
}

async function getRandomItem(){

    let randomId = getRandomInt(1, 50000); // el numero maximo es la suma de la cantidad de Items aproximados que hay en la API

    let variables ={
        id: randomId
    };

    const result = await fetchData(queryById, variables);

    const data = result.data.Page.media[0];

    if (result.data.Page.media.length !== 0){
        return data;
    }else {
        const data2 = await getRandomItem();
        return data2;
    }
}

function getRandomInt(min, max){ // Esta funcion nos da un Int entre los valores max y min, ambos incluidos
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export {
    getMangaByTitle,
    getAnimeByTitle,
    getCharacterByName,
    getRandomItem,
    fetchData
}