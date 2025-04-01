
// Query para buscar los mangas por titulo
let mangaByTitle = `
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
            chapters
            volumes
        }
      }
    }
`;


// Query para buscar los animes por titulo
let animeByTitle = `
    query ($search: String!) {
      Page {
        media(search: $search, isAdult: false, type: ANIME) {
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


// Query para obtener los personajes por el nombre
let characterByName = `
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

// Esta query nos permite buscar por ID, pero no se puede especificar el formato por que los IDs no dependen de ello
let queryById = `
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
        chapters
        volumes
    }
  }
}`;

export{
    mangaByTitle,
    animeByTitle,
    characterByName,
    queryById
}