import { MangaHTML, AnimeHTML, CharacterHTML } from "./classesHTML.js";
import { mangaByTitle, animeByTitle, queryCharacterByName, queryCharacterById, queryById } from "./queries.js";
import { getRandomItem } from "./api.js";

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
            manga.status,
            manga.startDate,
            manga.coverImage,
            manga.description,
            manga.genres,
            manga.chapters,
            manga.volumes
        );
        if (!mangaCard.coverImage) { //si no hay foto, no lo enseñes
            return
        } else {
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
            anime.status,
            anime.startDate,
            anime.coverImage,
            anime.description,
            anime.genres,
            anime.chapters,
            anime.volumes
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
            character.dateOfBirth,
            character.coverImage,
            character.description,
        );
        if (!characterCard.coverImage) { //si no hay foto, no lo enseñes
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

function displaySuggestions(){

    const resultSectionSuggestions = document.getElementById("home__suggestions");

    resultSectionSuggestions.innerHTML = "";

    let suggestions = [];

    for (i = 0; i < 10; i++){
        let item = getRandomItem(queryById);
        if (item.chapters !== null){
            const mangaCard = new MangaHTML(
                item.id,
                item.title,
                item.format,
                item.status,
                item.startDate,
                item.coverImage,
                item.description,
                item.genres,
                item.chapters,
                item.volumes
            );
            suggestions.push(mangaCard);
        }

        if (item.episodes !== null){
            const animeCard = new MangaHTML(
                item.id,
                item.title,
                item.format,
                item.status,
                item.startDate,
                item.coverImage,
                item.description,
                item.genres,
                item.episodes,
                item.duration
            );
            suggestions.push(animeCard);
        }
    }

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

export {
    toggleNav,
    displayManga,
    displayAnime,
    displayCharacter,
    displayFavoriteMangas,
    displayFavoriteAnimes,
    displaySuggestions,
	showSection
}