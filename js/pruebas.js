
import { fetchData } from "./api.js";
import { queryById } from "./queries.js";


const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
                'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery',
                'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life',
                'Sports', 'Supernatural', 'Thriller']


let query = `
query ($search: String!) {
  Page {
    media(search: $search, isAdult: false, type: MANGA) {
        id
        title {
            romaji
            english
            native
        }
        format
        status
        startDate {
            year
        }
        coverImage {
            extraLarge
            large
            medium
        }
        description
        genres
        characters(sort: [ROLE, RELEVANCE, ID]) {
            nodes {
                image {
                    large
                    medium
                    }
                name {
                    first
                    last
                    alternative
                }
            }
        }
        chapters
        volumes
    }
  }
}
`;

let query2 = `
query ($search: String!) {
  Page {
    media(search: $search, type: ANIME) {
        id
        title {
            romaji
            english
            native
        }
        format
        status
        startDate {
            year
        }
        coverImage {
            large
        }
        description
        episodes
        duration
    }
  }
}
`;

let query3 = `
query ($search: String!){
  Page{
    characters(search: $search) {
        id
        name {
            first
            last
        }
        age
        gender
        image{
            large
            medium
        }
        description(asHtml: true)
        dateOfBirth {
            day
            month
        }
    }
  }
}
`;

let query4 = `query Media {
        GenreCollection
}`;

let query5 = `
query ($id: Int!) {
  Page {
    media(id: $id, isAdult: false) {
        id
        title {
            romaji
            english
            native
        }
        format
        status
        startDate {
            year
        }
        coverImage {
            large
        }
        description
        genres
        characters(sort: [ROLE, RELEVANCE, ID]) {
            nodes {
                image {
                    large
                    medium
                    }
                name {
                    first
                    last
                    alternative
                }
            }
        }
        chapters
        volumes
        episodes
        duration
    }
  }
}`;

let query6 = `
    query CharacterDetails ($id: Int!){
      Page{
        characters(id: $id) {
            id
            name {
                first
                last
            }
            age
            gender
            image{
                large
                medium
            }
            description(asHtml: true)
            dateOfBirth {
                day
                month
            }
        }
      }
    }
`;

// Define our query variables and values that will be used in the query request
let variables = {
    search: "One Piece"
};
let variables2 ={
    id: 156271
};
// Define the config we'll need for our Api request
let url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Make the HTTP Api request
/* let response = await fetch(url, options).then(handleResponse)
                    .then(handleData)
                    .catch(handleError); */
fetch(url, options).then(handleResponse)
                    .then(handleData)
                    .catch(handleError);
function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
    //return data;
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

/* async function getRandomItem(){

    let randomId = getRandomInt(1, 260000); // el numero maximo es la suma de la cantidad de Items aproximados que hay en la API

    let variables ={
        id: randomId
    };

    const result = await fetchData(queryById, variables);

    return result.data.Page.media[0];
}

function getRandomInt(min, max){ // Esta funcion nos da un Int entre los valores max y min, ambos incluidos
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
} */

//console.log(await getRandomItem());