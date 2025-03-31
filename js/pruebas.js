
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

// Define our query variables and values that will be used in the query request
let variables = {
    search: "Naruto"
};
let variables2 ={
    id: 15
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
            query: query5,
            variables: variables2
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

//console.log(response.data.Page);