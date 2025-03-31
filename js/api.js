import { apiKey } from "./apikey.js"; //para saber de qué archivo cogemos la api key
import { displayManga, displayAnime, displayCharacter } from "./functions.js";

const URL = 'https://graphql.anilist.co';

//para el fetch con GET
async function fetchData(query,variables) {
    
    OPTIONS = {
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
    alert('Error, check console');
    console.error(error);
}

async function getBookBySubject(subject) {
    const url = `subject:"${subject}"`;
    const result = await fetchData(url);
    console.log(result);
    displayBook(result.items);
}

async function getBookByTitle(title) {
    const url = `intitle:"${title}"`;
    const result = await fetchData(url);
    console.log(result);
    displayBook(result.items);
}

async function getBookByAuthor(author) {
    const url = `inauthor:"${author}"`;
    const result = await fetchData(url);
    console.log(result);
    displayBook(result.items);
}

async function getBookByPublisher(publisher) {
    const url = `inpublisher:"${publisher}"`;
    const result = await fetchData(url);
    console.log(result);
    displayBook(result.items);
}


export {
    getBookByPublisher,
    getBookByTitle,
    getBookBySubject,
    getBookByAuthor
}