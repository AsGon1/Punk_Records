import { Manga, Anime, Character } from "./classes.js";

import { addMangaToLocalStorageArray, addAnimeToLocalStorageArray, removeMangaFromLocalStorageArray, removeAnimeFromLocalStorageArray, 
        getMangaFromLocalStorage, getAnimeFromLocalStorage, 
        findMangaInLocalStorageArray, findAnimeInLocalStorageArray} from "./localstorage.js";

import { displayManga, displayAnime, displayCharacter, displayFavoriteMangas,
         displayFavoriteAnimes, displaySuggestions } from "./functions.js";

import { getMangaByTitle, getAnimeByTitle, getCharacterByName } from "./api.js";


// GENEROS EXITENTES EN LA API
const GENRES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
                'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery',
                'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life',
                'Sports', 'Supernatural', 'Thriller']


class MangaHTML extends Manga {
    constructor(id, title, format = "Manga", chapters, volumes,status, startDate, coverImage, description, genres) {
        super(id, title, format, chapters, volumes,status, startDate, coverImage, description, genres);
        this.article = null;
    }

    // CREACION DE ARTICLES QUE REPRESENTA A CADA TARJETA DE LIBRO
    createHTML(fatherElement) {
        this.article = document.createElement("article");
        this.article.classList.add("manga", "card");

        fatherElement.appendChild(this.article);
    }

    // INICIALIZA CADA ELEMENTO PARA SU VISUALIZACION
    initialize(fatherElement) {
        this.createHTML(fatherElement);
        this.render();
    }

    // FUNCION GUARDAR FAVORITOS
    saveFav() {
        super.saveFav();
        this.article.classList.add("bookmark");
    }

    // FUNCION BORRAR FAVORITOS
    removeFav() {
        super.removeFav();
        this.article.classList.remove("bookmark");
    }

    saveRead() {
        super.saveRead();
        this.article.classList.add("readmark");
    }

    // FUNCION BORRAR FAVORITOS
    removeRead() {
        super.removeRead();
        this.article.classList.remove("readmark");
    }

    // VISUALIZACION DE ELEMENTOS. Tarjetas de mangas
    render() {
        const isBookmark = findMangaInLocalStorageArray("favoriteReadMangas", this);
        const isNotBookmark = findMangaInLocalStorageArray("favoriteNoReadMangas", this);
        this.article.innerHTML = "";

        const image = document.createElement("img");

        const attributesTitle = document.createElement("ul");
        attributesTitle.classList.add("titleList");
        const attributesTitleEnglish = document.createElement("li");
        const attributesTitleNative = document.createElement("li");
        const attributesTitleRomaji = document.createElement("li");

        const attributesFormat = document.createElement("h4");

        const attributeList = document.createElement("ul");
        const attributesStartDate = document.createElement("li");
        const attributesChapters = document.createElement("li");
        const attributesVolumes = document.createElement("li");
        const attributesDescription = document.createElement("li");

        const attributesGenres = document.createElement("ul");
        attributesGenres.classList.add("genres");
        const attributesGenresTitle = document.createElement("li");
        attributesGenresTitle.textContent = "Genres:";
        attributesGenres.appendChild(attributesGenresTitle);

        const favButton = document.createElement("button");
        favButton.classList.add("favButton");
        const readButton = document.createElement("button");
        readButton.classList.add("readButton");

        image.setAttribute("src", this.coverImage.large);
        attributesTitleEnglish.textContent = "English: " + (this.title.english || "");
        attributesTitleNative.textContent = "Native: " + (this.title.native || "");
        attributesTitleRomaji.textContent = "Romaji: " +(this.title.romaji || "");
        attributesFormat.textContent = this.format;

        attributeList.classList.add("manga__attributes");

        attributesStartDate.classList.add("attribute", "date");
        attributesStartDate.textContent = "Publishing Date: " + this.startDate.year;

        attributesChapters.classList.add("attribute", "chapters");
        attributesChapters.textContent = "Chapters: " + this.chapters;

        attributesVolumes.classList.add("attribute", "volumes");
        attributesVolumes.textContent = "Volumes: " + this.volumes;

        attributesDescription.classList.add("attribute", "description");
        attributesDescription.innerHTML = this.description;


        if (isBookmark || isNotBookmark) {
            favButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>`;
        } else {
            favButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>`;
        }

        favButton.addEventListener("click", () => {
            if (isBookmark) {
                this.removeFav();
                removeMangaFromLocalStorageArray("favoriteReadMangas", this);
            } else {
                this.saveFav();
                addMangaToLocalStorageArray("favoriteNoReadMangas", this);
            };

            if (isNotBookmark){
                this.removeFav();
                removeMangaFromLocalStorageArray("favoriteNoReadMangas", this);
            };

            const favReadMangaListLocalStorage = getMangaFromLocalStorage("favoriteReadMangas") || [];
            const favNoReadMangaListLocalStorage = getMangaFromLocalStorage("favoriteNoReadMangas") || [];
            displayFavoriteMangas(favReadMangaListLocalStorage, favNoReadMangaListLocalStorage);
            this.render();
        })

        if (isBookmark || this.read) {
            readButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
</svg>`;
        } else if (isNotBookmark || !this.read){
            readButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
</svg>`;
        }

        readButton.addEventListener("click", () => {
            if (isBookmark) {
                this.removeRead();
                removeMangaFromLocalStorageArray("favoriteReadMangas", this);
                addMangaToLocalStorageArray("favoriteNoReadMangas", this);
            }

            if (isNotBookmark){
                this.removeRead();
                removeMangaFromLocalStorageArray("favoriteNoReadMangas", this);
                addMangaToLocalStorageArray("favoriteReadMangas", this);
            }

            if (!isBookmark && !isNotBookmark){
                this.saveRead();
                addMangaToLocalStorageArray("favoriteReadMangas", this);
            }
            const favReadMangaListLocalStorage = getMangaFromLocalStorage("favoriteReadMangas") || [];
            const favNoReadMangaListLocalStorage = getMangaFromLocalStorage("favoriteNoReadMangas") || [];
            displayFavoriteMangas(favReadMangaListLocalStorage, favNoReadMangaListLocalStorage);
            this.render();
        })

        attributeList.append(attributesStartDate, attributesChapters, attributesVolumes, attributesDescription);
        attributesTitle.append(attributesTitleEnglish, attributesTitleNative, attributesTitleRomaji);

        this.article.appendChild(image);
        this.article.appendChild(attributesTitle);
        this.article.appendChild(attributesFormat);
        this.article.appendChild(attributeList);

        this.createGenres(attributesGenres);
        this.article.appendChild(attributesGenres);

        this.article.appendChild(favButton);
        
        this.article.appendChild(readButton);
    }

    // AÑADIDO DE TODAS LOS GENEROS A LA LISTA EN FUNCION DE LA CANTIDAD
    createGenres(attributesGenres) {
        for (let i = 0; i < this.genres.length; i++) {
            const genre = document.createElement("li");
            genre.classList.add("attribute", "category");
            genre.textContent += this.genres[i];
            attributesGenres.append(genre);
        }
    }
}

class AnimeHTML extends Anime {
    constructor(id, title, format = "Anime", episodes, duration, status, startDate, coverImage, description, genres) {
        super(id, title, format, episodes, duration, status, startDate, coverImage, description, genres);
        this.article = null;
    }

    // CREACION DE ARTICLES QUE REPRESENTA A CADA TARJETA DE ANIME
    createHTML(fatherElement) {
        this.article = document.createElement("article");
        this.article.classList.add("anime", "card");

        fatherElement.appendChild(this.article);
    }

    // INICIALIZA CADA ELEMENTO PARA SU VISUALIZACION
    initialize(fatherElement) {
        this.createHTML(fatherElement);
        this.render();
    }

    // FUNCION GUARDAR FAVORITOS
    saveFav() {
        super.saveFav();
        this.article.classList.add("bookmark"); // Se usa la misma clase que con los mangas para facilitar el diseño en css
    }

    // FUNCION BORRAR FAVORITOS
    removeFav() {
        super.removeFav();
        this.article.classList.remove("bookmark");
    }

    saveViewed() {
        super.saveViewed();
        this.article.classList.add("viewedmark");
    }

    // FUNCION BORRAR FAVORITOS
    removeViewed() {
        super.removeViewed();
        this.article.classList.remove("viewedmark");
    }

    // VISUALIZACION DE ELEMENTOS. Tarjetas de animes
    render() {
        const isBookmark = findAnimeInLocalStorageArray("favoriteViewedAnimes", this);
        const isNotBookmark = findAnimeInLocalStorageArray("favoriteNoViewedAnimes", this);
        this.article.innerHTML = "";

        const image = document.createElement("img");
        const attributesTitle = document.createElement("ul");
        const attributesTitleEnglish = document.createElement("li");
        const attributesTitleNative = document.createElement("li");
        const attributesTitleRomaji = document.createElement("li");
        const attributesFormat = document.createElement("h4");

        const attributeList = document.createElement("ul");
        attributesTitle.classList.add("titleList");
        const attributesStartDate = document.createElement("li");
        const attributesEpisodes = document.createElement("li");
        const attributesDuration = document.createElement("li");
        const attributesDescription = document.createElement("li");

        const attributesGenres = document.createElement("ul");
        attributesGenres.classList.add("genres");
        const attributesGenresTitle = document.createElement("li");
        attributesGenresTitle.textContent = "Genres:";
        attributesGenres.appendChild(attributesGenresTitle);

        const favButton = document.createElement("button");
        favButton.classList.add("favButton");
        const viewedButton = document.createElement("button");
        viewedButton.classList.add("viewedButton");

        image.setAttribute("src", this.coverImage.large);
        attributesTitleEnglish.textContent = "English: " + (this.title.english || "");
        attributesTitleNative.textContent = "Native: " + (this.title.native || "");
        attributesTitleRomaji.textContent = "Romaji: " +(this.title.romaji || "");
        attributesFormat.textContent = this.format;

        attributeList.classList.add("anime__attributes");

        attributesStartDate.classList.add("attribute", "date");
        attributesStartDate.textContent = "Realese Date: " + this.startDate.year;

        attributesEpisodes.classList.add("attribute", "chapters");
        attributesEpisodes.textContent = "Episodes: " + this.episodes;

        attributesDuration.classList.add("attribute", "volumes");
        attributesDuration.textContent = "Duration: " + this.duration;

        attributesDescription.classList.add("attribute", "description");
        attributesDescription.innerHTML = this.description;


        if (isBookmark || isNotBookmark) {
            favButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>`;
        } else {
            favButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>`;
        }

        favButton.addEventListener("click", () => {
            if (isBookmark) {
                this.removeFav();
                removeAnimeFromLocalStorageArray("favoriteViewedAnimes", this);
            } else {
                this.saveFav();
                addAnimeToLocalStorageArray("favoriteNoViewedAnimes", this);
            }

            if (isNotBookmark){
                this.removeFav();
                removeAnimeFromLocalStorageArray("favoriteNoViewedAnimes", this);
            }

            const favViewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteViewedAnimes") || [];
            const favNoviewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteNoViewedAnimes") || [];
            displayFavoriteAnimes(favViewedAnimeListLocalStorage, favNoviewedAnimeListLocalStorage);
            this.render();
        })

        if (isBookmark) {
            viewedButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>`;
        } else if (isNotBookmark || !this.watched){
            viewedButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg>`;
        }

        viewedButton.addEventListener("click", () => {
            
            if (isBookmark) {
                this.removeViewed();
                removeAnimeFromLocalStorageArray("favoriteViewedAnimes", this);
                addAnimeToLocalStorageArray("favoriteNoViewedAnimes", this);
            };

            if (isNotBookmark){
                this.removeViewed();
                removeAnimeFromLocalStorageArray("favoriteNoViewedAnimes", this);
                addAnimeToLocalStorageArray("favoriteViewedAnimes", this);
            };

            if (!isBookmark && !isNotBookmark){
                this.saveViewed();
                addAnimeToLocalStorageArray("favoriteViewedAnimes", this);
            }

            const favViewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteViewedAnimes") || [];
            const favNoViewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteNoViewedAnimes") || [];
            displayFavoriteAnimes(favViewedAnimeListLocalStorage, favNoViewedAnimeListLocalStorage);
            this.render();
        })

        attributeList.append(attributesStartDate, attributesEpisodes, attributesDuration, attributesDescription);
        attributesTitle.append(attributesTitleEnglish, attributesTitleNative, attributesTitleRomaji);

        this.article.appendChild(image);
        this.article.appendChild(attributesTitle);
        this.article.appendChild(attributesFormat);
        this.article.appendChild(attributeList);

        this.createGenres(attributesGenres);
        this.article.appendChild(attributesGenres);

        this.article.appendChild(favButton);
        
        this.article.appendChild(viewedButton);
    }

    // AÑADIDO DE TODAS LOS GENEROS A LA LISTA EN FUNCION DE LA CANTIDAD
    createGenres(attributesGenres) {
        for (let i = 0; i < this.genres.length; i++) {
            const genre = document.createElement("li");
            genre.classList.add("attribute", "category");
            genre.textContent += this.genres[i];
            attributesGenres.append(genre);
        }
    }
}

class PunkRecordsHTML {

    constructor() {
        this.initialize();
    }

    initialize() { //lo que se ve, sin ningún cambio
        this.initializeHome();
        this.initializeBrowser();
        this.initializeFavorites();
    }

    initializeHome() {
        this.initializeHomeBrowser(); // buscador en la pagina de home
        this.initializeHomeSuggestions(); //Sugerencias de Home
    }

    initializeHomeBrowser(){

        const browser = document.getElementById("home__browser"); //sección browser página principal

        // creación del BUSCADOR
        const browserInput = document.createElement('input');
        const browserButton = document.createElement('button');

        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Search Manga..."); //añadir al input el placeholder

        browserButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>`;//añadir el Buscar

        browser.append(browserInput, browserButton);

        browserButton.addEventListener("click", async (e) => {
            await getMangaByTitle(browserInput.value);
			document.getElementById('browser').classList.remove('hidden');
			document.getElementById('home').classList.add('hidden');
        });

        browserInput.addEventListener("keydown", function (event){
            let code = event.key;
            if (code === 'Enter'){
                getMangaByTitle(browserInput.value);
				document.getElementById('browser').classList.remove('hidden');
				document.getElementById('home').classList.add('hidden');
            }
        });
    }

    initializeHomeSuggestions(){
        displaySuggestions();
    }

    initializeBrowser(){

        const browser = document.getElementById('browser');
        const tituloBrowser = document.createElement('h1');
        
        //boton
        const browserDivInput = document.createElement('div');
        const browserInput = document.createElement('input');
        const browserDivButton = document.createElement('div');
        const browserButton = document.createElement('button');
        
        const sectionFilters = document.createElement('section');

        const mangaDiv = document.createElement('div');
        const checkboxManga = document.createElement('input');
        const textCheckboxManga = document.createElement('label');

        const animeDiv = document.createElement('div');
        const checkboxAnime = document.createElement('input');
        const textCheckboxAnime = document.createElement('label');

        //section resultados
        const resultSection = document.createElement('section');
        
        //ATRIBUTOS
        tituloBrowser.textContent = "SEARCH FOR...";
        //boton
        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Search..."); //añadir al input el placeholder

        browserButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>`;
        //añadir el Buscar
        browserDivInput.setAttribute("id", "browser__advanceBrowser-input");
        browserDivButton.setAttribute("id", "browser__advanceBrowser-button")
        
        sectionFilters.setAttribute("id", "browser__filters");
        textCheckboxManga.textContent = "Manga";
        textCheckboxManga.setAttribute("for", "manga");
        checkboxManga.setAttribute("type", "radio");
        checkboxManga.setAttribute("name", "filter");
        checkboxManga.setAttribute("value", "manga");
        checkboxManga.setAttribute("checked", ""); //para que aparezca marcado por defecto
        
        textCheckboxAnime.textContent = "Anime";
        textCheckboxAnime.setAttribute("for", "anime");
        checkboxAnime.setAttribute("type", "radio");
        checkboxAnime.setAttribute("name", "filter");
        checkboxAnime.setAttribute("value", "anime");

        //section results
        resultSection.setAttribute("id", "browser__results");

        //APPEND
        browserDivInput.append(browserInput, browserButton); //meter el input en el div
        mangaDiv.append(checkboxManga, textCheckboxManga);
        animeDiv.append(checkboxAnime, textCheckboxAnime);
        sectionFilters.append(mangaDiv, animeDiv);
        browser.append(tituloBrowser, browserDivInput, sectionFilters, resultSection); //meter el div en la section browser


        browserButton.addEventListener("click", async (e) => {
            const selectedOption = document.querySelector('input[name="filter"]:checked').value;
            if (selectedOption === "manga"){
                await getMangaByTitle(browserInput.value);
            }else if (selectedOption === "anime"){
                await getAnimeByTitle(browserInput.value);
            }

        });

        browserInput.addEventListener("keydown", function (event){
            
            let code = event.key;

            const selectedOption = document.querySelector('input[name="filter"]:checked').value;

            if (code === 'Enter'){
                if (selectedOption === "manga"){
                    getMangaByTitle(browserInput.value);
                }else if (selectedOption === "anime"){
                    getAnimeByTitle(browserInput.value);
                }
            }

        });
        
    }

    initializeFavorites(){

        const favSection = document.getElementById("favorites");
        const tituloFavSection = document.createElement('h1');
        tituloFavSection.textContent = "YOUR FAVORITES";
        favSection.innerHTML = "";

        const favoriteLocalStorageReadMangas = getMangaFromLocalStorage("favoriteReadMangas") || []; //si hay wishlist la carga, si no, array vacío
        const favoriteLocalStorageReadMangasDiv = document.createElement("div");
        const tituloReadSection = document.createElement('h3');
        tituloReadSection.textContent = "READ";
        favoriteLocalStorageReadMangasDiv.setAttribute("id", "favorites__manga-read");

        const favoriteLocalStorageNoReadMangas = getMangaFromLocalStorage("favoriteNoReadMangas") || []; //si hay wishlist la carga, si no, array vacío
        const favoriteLocalStorageNoReadMangasDiv = document.createElement("div");
        const tituloNoReadSection = document.createElement('h3');
        tituloNoReadSection.textContent = "NOT READ";
        favoriteLocalStorageNoReadMangasDiv.setAttribute("id", "favorites__manga-not-read");

        const favoriteLocalStorageViewedAnimes = getAnimeFromLocalStorage("favoriteViewedAnimes") || []; //si hay wishlist la carga, si no, array vacío
        const favoriteLocalStorageViewedAnimesDiv = document.createElement("div");
        const tituloViewedSection = document.createElement('h3');
        tituloViewedSection.textContent = "VIEWED";
        favoriteLocalStorageViewedAnimesDiv.setAttribute("id", "favorites__anime-viewed");

        const favoriteLocalStorageNoViewdAnimes = getAnimeFromLocalStorage("favoriteNoViewedAnimes") || []; //si hay wishlist la carga, si no, array vacío
        const favoriteLocalStorageNoViewdAnimesDiv = document.createElement("div");
        const tituloNoViewedSection = document.createElement('h3');
        tituloNoViewedSection.textContent = "NOT VIEWED";
        favoriteLocalStorageNoViewdAnimesDiv.setAttribute("id", "favorites__anime-not-viewed");

        favSection.append(tituloFavSection, tituloReadSection, favoriteLocalStorageReadMangasDiv, 
            tituloNoReadSection, favoriteLocalStorageNoReadMangasDiv, tituloViewedSection, favoriteLocalStorageViewedAnimesDiv,
            tituloNoViewedSection, favoriteLocalStorageNoViewdAnimesDiv);
        
        displayFavoriteMangas(favoriteLocalStorageReadMangas, favoriteLocalStorageNoReadMangas);
        displayFavoriteAnimes(favoriteLocalStorageViewedAnimes, favoriteLocalStorageNoViewdAnimes);
        
    }
}

export {
    MangaHTML,
    AnimeHTML,
    PunkRecordsHTML
}