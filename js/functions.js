import { MangaHTML, AnimeHTML} from "./classesHtml.js";
import { mangaByTitle, animeByTitle, characterByName, queryById } from "./queries.js";
import { getRandomItem } from "./api.js";

const MANGAFORMATS = ["MANGA", "NOVEL", "ONE_SHOT"];
const ANIMEFORMATS = ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC"];

function toggleNav() { //para hamburguesa
    let nav = document.querySelector(".menu__burger-links");
	console.log(nav);
    nav.classList.toggle("active");
}

function displayManga(mangas) {
    const resultSection = document.getElementById("browser__results");
    resultSection.innerHTML = ""; //si hemos hecho búsqueda anterior, la borra
    mangas.forEach(manga => {
        const mangaCard = new MangaHTML(
            manga.id,
            manga.title,
            manga.format,
            manga.chapters,
            manga.volumes,
            manga.status,
            manga.startDate,
            manga.coverImage,
            manga.description,
            manga.genres
        );
        if (!mangaCard.coverImage) { //si no hay foto, no lo enseñes
            return
        } else {
            console.log(mangaCard);
            mangaCard.initialize(resultSection);
        }
        
    });
}

function displayAnime(animes) {
    const resultSection = document.getElementById("browser__results");
    resultSection.innerHTML = ""; //si hemos hecho búsqueda anterior, la borra
    animes.forEach(anime => {
        const animeCard = new AnimeHTML(
            anime.id,
            anime.title,
            anime.format,
            anime.episodes,
            anime.duration,
            anime.status,
            anime.startDate,
            anime.coverImage,
            anime.description,
            anime.genres
        );
        if (!animeCard.coverImage) { //si no hay foto, no lo enseñes
            return
        } else {
            animeCard.initialize(resultSection);
        }
    });
}

function displayCharacter(characters) {
    const resultSection = document.getElementById("browser__results");
    resultSection.innerHTML = ""; //si hemos hecho búsqueda anterior, la borra
    characters.forEach(character => {
        const characterCard = new CharacterHTML(
            character.id,
            character.name,
            character.age,
            character.gender,
            character.description,
            character.dateOfBirth,
            character.image
        );
        if (!characterCard.image) { //si no hay foto, no lo enseñes
            return
        } else {
            characterCard.initialize(resultSection);
        }
    });
}

function displayFavoriteMangas(readMangas, noReadMangas) {
    const resultSectionRead = document.getElementById("favorites__manga-read");
    const resultSectionNotRead = document.getElementById("favorites__manga-not-read");
    
    resultSectionRead.innerHTML = "";
    resultSectionNotRead.innerHTML = "";

    readMangas.forEach(manga => {
        if (!manga.coverImage.large) { //si no hay foto, no lo enseñes
            return
        } else {
            manga.initialize(resultSectionRead);
        }
    });

    noReadMangas.forEach(manga => {
        if (!manga.coverImage.large) { //si no hay foto, no lo enseñes
            return
        } else {
            manga.initialize(resultSectionNotRead );
        }
    });
}

function displayFavoriteAnimes(viewedAnimes, noViewedAnimes) {
    const resultSectionViewed = document.getElementById("favorites__anime-viewed");
    const resultSectionNotViewed = document.getElementById("favorites__anime-not-viewed");
    
    resultSectionViewed.innerHTML = "";
    resultSectionNotViewed.innerHTML = "";
    
    viewedAnimes.forEach(anime => {
        if (!anime.coverImage.large) {
            return
        } else {
            anime.initialize(resultSectionViewed);
        }
    });

    noViewedAnimes.forEach(anime => {
        if (!anime.coverImage.large) {
            return
        } else {
            anime.initialize(resultSectionNotViewed);
        }
    });
}

async function displaySuggestions(){

    const resultSectionSuggestions = document.getElementById("home__suggestions");

    resultSectionSuggestions.innerHTML = "";

    let suggestions = [];

    for (let i = 0; i < 6; i++){
        let item = await getRandomItem(queryById);

        if (MANGAFORMATS.includes(item.format)){ // Se comprueba si el objeto que se ha solicitado tiene el formato adecuado
            const mangaCard = new MangaHTML(
                item.id,
                item.title,
                item.format,
                item.chapters,
                item.volumes,
                item.status,
                item.startDate,
                item.coverImage,
                item.description,
                item.genres
            );
            suggestions.push(mangaCard);
        }

        if (ANIMEFORMATS.includes(item.format)){ // Se comprueba si el objeto que se ha solicitado tiene el formato adecuado
            const animeCard = new AnimeHTML(
                item.id,
                item.title,
                item.format,
                item.episodes,
                item.duration,
                item.status,
                item.startDate,
                item.coverImage,
                item.description,
                item.genres
            );
            suggestions.push(animeCard);
            
        }
    }

    console.log(suggestions);

    suggestions.forEach(card => {
        if (!card.coverImage.large) {
            return
        } else {
            card.initialize(resultSectionSuggestions);
        }
    });
}

function showSection(sectionId) {
	// Convertimos todas las secciones en hidden

	document.querySelectorAll('.content').forEach(section => {
		section.classList.add('hidden');
	})
	document.getElementById(sectionId).classList.remove('hidden')
}

function showHomeSection(homeId, section1, section2) {
	// Convertimos todas las secciones en hidden

	document.querySelectorAll('.content').forEach(section => {
		section.classList.add('hidden');
	})
	document.getElementById(homeId).classList.remove('hidden');
    document.getElementById(section1).classList.remove('hidden');
    document.getElementById(section2).classList.remove('hidden');
}

export {
    toggleNav,
    displayManga,
    displayAnime,
    displayCharacter,
    displayFavoriteMangas,
    displayFavoriteAnimes,
    displaySuggestions,
	showSection,
    showHomeSection
}