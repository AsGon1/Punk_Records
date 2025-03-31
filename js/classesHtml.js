import { Manga, Anime, Character } from "./classes.js";
import { addToLocalStorageArray, getMangaFromLocalStorage, getAnimeFromLocalStorage, 
         removeFromLocalStorageArray, findMangaInLocalStorageArray, findAnimeInLocalStorageArray} from "./localstorage.js";
         import { displayBook, displayFavoriteMangas, displayFavoriteAnimes } from "./functions.js";

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

        const favButton = document.createElement("button");
        const readButton = document.createElement("button");

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
        attributesDescription.textContent = "Description: " + this.description;


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
                removeFromLocalStorageArray("favoriteReadMangas", this);
            } else {
                this.saveFav();
                addToLocalStorageArray("favoriteNoReadMangas", this);
            }

            if (isNotBookmark){
                this.removeFav();
                removeFromLocalStorageArray("favoriteNoReadMangas", this);
            }else{
                this.saveFav();
                addToLocalStorageArray("favoriteNoReadMangas", this);
            }
            const favReadMangaListLocalStorage = getMangaFromLocalStorage("favoriteReadMangas") || [];
            const favNoReadMangaListLocalStorage = getMangaFromLocalStorage("favoriteNoReadMangas") || [];
            displayFavoriteMangas(favReadMangaListLocalStorage, favNoReadMangaListLocalStorage);
            this.render();
        })

        if (isBookmark) {
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
                removeFromLocalStorageArray("favoriteReadMangas", this);
                addToLocalStorageArray("favoriteNoReadMangas", this);
            } else {
                this.saveRead();
                addToLocalStorageArray("favoriteReadMangas", this);
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
            category.classList.add("attribute", "genre");
            if (i === 0) {
                category.textContent = "Genres: " + this.categories[i];
            } else {
            category.textContent += this.categories[i];
            }
            attributesGenres.append(genre);
        }
    }
}

class AnimeTML extends Anime {
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

    saveRead() {
        super.saveFav();
        this.article.classList.add("viewedmark");
    }

    // FUNCION BORRAR FAVORITOS
    removeRead() {
        super.removeFav();
        this.article.classList.remove("viewedmark");
    }

    // VISUALIZACION DE ELEMENTOS. Tarjetas de animes
    render() {
        const isBookmark = findAnimeInLocalStorageArray("favoriteViewedAnime", this);
        const isNotBookmark = findAnimeInLocalStorageArray("favoriteNoViewedAnime", this);
        this.article.innerHTML = "";

        const image = document.createElement("img");
        const attributesTitle = document.createElement("ul");
        const attributesTitleEnglish = document.createElement("li");
        const attributesTitleNative = document.createElement("li");
        const attributesTitleRomaji = document.createElement("li");
        const attributesFormat = document.createElement("h4");

        const attributeList = document.createElement("ul");
        const attributesStartDate = document.createElement("li");
        const attributesEpisodes = document.createElement("li");
        const attributesDuration = document.createElement("li");
        const attributesDescription = document.createElement("li");

        const attributesGenres = document.createElement("ul");

        const favButton = document.createElement("button");
        const viewedButton = document.createElement("button");

        image.setAttribute("src", this.coverImage.large);
        attributesTitleEnglish.textContent = "English: " + (this.title.english || "");
        attributesTitleNative.textContent = "Native: " + (this.title.native || "");
        attributesTitleRomaji.textContent = "Romaji: " +(this.title.romaji || "");
        attributesFormat.textContent = this.format;

        attributeList.classList.add("anime__attributes");

        attributesStartDate.classList.add("attribute", "date");
        attributesStartDate.textContent = "Realese Date: " + this.startDate;

        attributesEpisodes.classList.add("attribute", "chapters");
        attributesEpisodes.textContent = "Episodes: " + this.episodes;

        attributesDuration.classList.add("attribute", "volumes");
        attributesDuration.textContent = "Duration: " + this.duration;

        attributesDescription.classList.add("attribute", "description");
        attributesDescription.textContent = "Description: " + this.description;


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
                removeFromLocalStorageArray("favoriteViewedAnimes", this);
            } else {
                this.saveFav();
                addToLocalStorageArray("favoriteNoViewedAnimes", this);
            }

            if (isNotBookmark){
                this.removeFav();
                removeFromLocalStorageArray("favoriteNoViewedAnimes", this);
            }else{
                this.saveFav();
                addToLocalStorageArray("favoriteNoViewedAnimes", this);
            }
            const favViewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteReadMangas") || [];
            const favNoviewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteNoReadMangas") || [];
            displayFavoriteAnimes(favViewedAnimeListLocalStorage, favNoviewedAnimeListLocalStorage);
            this.render();
        })

        if (isBookmark) {
            viewedButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>`;
        } else if (isNotBookmark || !this.read){
            viewedButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg>`;
        }

        readButton.addEventListener("click", () => {
            if (isBookmark) {
                this.removeRead();
                removeFromLocalStorageArray("favoriteViewedAnimes", this);
                addToLocalStorageArray("favoriteNoViewedAnimes", this);
            } else {
                this.saveRead();
                addToLocalStorageArray("favoriteViewedAnimes", this);
            }
            const favViewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteReadMangas") || [];
            const favNoViewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteNoReadMangas") || [];
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
        
        this.article.appendChild(readButton);
    }

    // AÑADIDO DE TODAS LOS GENEROS A LA LISTA EN FUNCION DE LA CANTIDAD
    createGenres(attributesGenres) {
        for (let i = 0; i < this.genres.length; i++) {
            const genre = document.createElement("li");
            category.classList.add("attribute", "genre");
            if (i === 0) {
                category.textContent = "Genres: " + this.categories[i];
            } else {
            category.textContent += this.categories[i];
            }
            attributesGenres.append(genre);
        }
    }
}

class CharacterHTML extends Character {
    
    constructor(id, name, age, gender, description, dateOfBirth, image) {
        super(id, name, age, gender, description, dateOfBirth, image);
        this.article = null;
    }

    // CREACION DE ARTICLES QUE REPRESENTA A CADA TARJETA DE LIBRO
    createHTML(fatherElement) {
        this.article = document.createElement("article");
        this.article.classList.add("character", "card");

        fatherElement.appendChild(this.article);
    }

    // INICIALIZA CADA ELEMENTO PARA SU VISUALIZACION
    initialize(fatherElement) {
        this.createHTML(fatherElement);
        this.render();
    }

    // VISUALIZACION DE ELEMENTOS. Tarjetas de personajes
    render() {

        this.article.innerHTML = "";

        const image = document.createElement("img");
        const attributesName = document.createElement("h3");

        const attributeList = document.createElement("ul");
        const attributesAge = document.createElement("li");
        const attributesGender = document.createElement("li");
        const attributesBirthday = document.createElement("li");
        const attributesDescription = document.createElement("li");

        image.setAttribute("src", this.coverImage.large);
        attributesName.textContent = this.name.first + " " + this.name.last;

        attributeList.classList.add("character__attributes");

        attributesAge.classList.add("attribute", "age");
        attributesAge.textContent = "Age: " + this.age;

        attributesBirthday.classList.add("attribute", "birthday");
        attributesBirthday.textContent = "Birthday (dd/mm): " + this.dateOfBirth.day + "/" + this.dateOfBirth.month;

        attributesGender.classList.add("attribute", "gender");
        attributesGender.textContent = "Gender: " + this.gender;

        attributesDescription.classList.add("attribute", "description");
        attributesDescription.innerHTML = this.description;

        attributeList.append(attributesAge, attributesBirthday, attributesGender, attributesDescription);

        this.article.appendChild(image);
        this.article.appendChild(attributesName);
        this.article.appendChild(attributeList);

    }
}

class PunkRecordsHTML {
    constructor() {
        this.initialize();
    }

    initialize() { //lo que se ve, sin ningún cambio
        this.initializeHome();
        this.initializeArchive();
        this.initializeFavorites();
    }

    initializeHome() {
        this.initializeHomeBrowser(); // buscador en la pagina de home
        this.initializeHomeMangas(); //Sugerencias de Mangas en Home
        this.initializeHomeAnimes();
        this.initializeHomeCharacters();
    }

    initializeHomeBrowser(){

        const home = document.getElementById("home"); //sección home página principal

        // creación del BUSCADOR
        const browserDiv = document.createElement('div');
        const browserInput = document.createElement('input');
        const browserButton = document.createElement('button');
        
        const browserSelect = document.createElement('select'); // Select para la elección de busqueda
        
        const browserSelectDefaultOption = document.createElement('option');
        browserSelectDefaultOption.value = 0;
        browserSelectDefaultOption.text = "Selecciona tipo...";

        const browserSelectOptionManga = document.createElement('option');
        browserSelectDefaultOption.value = 1;
        browserSelectDefaultOption.text = "Manga";

        const browserSelectOptionAnime = document.createElement('option');
        browserSelectDefaultOption.value = 2;
        browserSelectDefaultOption.text = "Anime";

        const browserSelectOptionCharacter = document.createElement('option');
        browserSelectDefaultOption.value = 3;
        browserSelectDefaultOption.text = "Character";

        browserSelect.add(browserSelectDefaultOption);
        browserSelect.add(browserSelectOptionManga);
        browserSelect.add(browserSelectOptionAnime);
        browserSelect.add(browserSelectOptionCharacter);

        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Buscar por Título..."); //añadir al input el placeholder

        browserButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>`;//añadir el Buscar

        browserDiv.setAttribute("id", "home__browser");
        browserDiv.append(browserInput, browserButton, browserSelect); //meter el input y botón en el div
        home.append(browserDiv); //meter el div en la section browser

        let selectedValue = 0;
        browserSelect.addEventListener("Change", (event) => {
            selectedValue = event.target.value;
        });

        browserButton.addEventListener("click", async (e) => {

            if (selectedValue === 1){
                await getMangaByTitle(browserInput.value);
            }else if (selectedValue === 2){
                await getAnimeByTitle(browserInput.value);
            }else if (selectedValue === 3){
                await getCharacter(browserInput.value);
            }
            
			document.getElementById('browser').classList.remove('hidden');
			document.getElementById('home__browser').classList.add('hidden');
        });

        browserInput.addEventListener("keydown", function (event){
            let code = event.key;
            if (code === 'Enter'){
                if (selectedValue === 1){
                    getMangaByTitle(browserInput.value);
                }else if (selectedValue === 2){
                    getAnimeByTitle(browserInput.value);
                }else if (selectedValue === 3){
                    getCharacter(browserInput.value);
                }
				document.getElementById('browser').classList.remove('hidden');
				document.getElementById('home__browser').classList.add('hidden');
            }
        });

    }


    initializeBrowser(){
        const browser = document.getElementById('browser');
        const tituloBrowser = document.createElement('h1');
        //boton
        const browserDivInput = document.createElement('div');
        const browserInput = document.createElement('input');
        const browserDivButton = document.createElement('div');
        const browserButton = document.createElement('button');
        //filters
        const sectionFilters = document.createElement('section');

        const titleDiv = document.createElement('div');
        const checkboxTitle = document.createElement('input');
        const textCheckboxTitle = document.createElement('label');

        const authorDiv = document.createElement('div');
        const checkboxAuthor = document.createElement('input');
        const textCheckboxAuthor = document.createElement('label');

        const publisherDiv = document.createElement('div');
        const checkboxPublisher = document.createElement('input');
        const textCheckboxPublisher = document.createElement('label');

        const genreDiv = document.createElement('div');
        const checkboxRadioGenre = document.createElement('input');
        const textCheckboxGenre = document.createElement('label');

        const browserImg = document.createElement('img');
        browserImg.setAttribute("src", "./assets/browser-img.jpg");
        browserImg.setAttribute("id", "browser-img")

        //disclaimer
        const disclaimer = document.createElement('p');
        //section resultados
        const resultSection = document.createElement('section');
        
        //ATRIBUTOS
        tituloBrowser.textContent = "BÚSQUEDA AVANZADA";
        //boton
        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Encuentra tu siguiente lectura"); //añadir al input el placeholder
        browserButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>`;//añadir el Buscar
        browserDivInput.setAttribute("id", "browser__advanceBrowser-input");
        browserDivButton.setAttribute("id", "browser__advanceBrowser-button")
        //filters
        sectionFilters.setAttribute("id", "browser__filters");
        textCheckboxTitle.textContent = "Título";
        textCheckboxTitle.setAttribute("for", "title");
        checkboxTitle.setAttribute("type", "radio");
        checkboxTitle.setAttribute("name", "filter");
        checkboxTitle.setAttribute("value", "title");
        checkboxTitle.setAttribute("checked", ""); //para que aparezca marcado por defecto
        textCheckboxAuthor.textContent = "Autorx";
        textCheckboxAuthor.setAttribute("for", "author");
        checkboxAuthor.setAttribute("type", "radio");
        checkboxAuthor.setAttribute("name", "filter");
        checkboxAuthor.setAttribute("value", "author");
        textCheckboxPublisher.textContent = "Editorial";
        textCheckboxPublisher.setAttribute("for", "publisher");
        checkboxPublisher.setAttribute("type", "radio");
        checkboxPublisher.setAttribute("name", "filter");
        checkboxPublisher.setAttribute("value", "publisher");
        textCheckboxGenre.textContent = "Género literario*";
        textCheckboxGenre.setAttribute("for", "genre");
        checkboxRadioGenre.setAttribute("type", "radio");
        checkboxRadioGenre.setAttribute("name", "filter");
        checkboxRadioGenre.setAttribute("value", "genre");
        //disclaimer
        disclaimer.setAttribute("id", "browser__disclaimer");
        disclaimer.textContent = "*Para buscar por género literario, por favor introdúcelo sin tildes"
        //section results
        resultSection.setAttribute("id", "browser__results");

        //APPEND
        browserDivInput.append(browserInput, browserButton); //meter el input en el div
        titleDiv.append(checkboxTitle, textCheckboxTitle);
        authorDiv.append(checkboxAuthor, textCheckboxAuthor);
        genreDiv.append(checkboxRadioGenre, textCheckboxGenre);
        publisherDiv.append(checkboxPublisher, textCheckboxPublisher);
        sectionFilters.append(titleDiv, authorDiv, genreDiv, publisherDiv);
        browser.append(browserImg, tituloBrowser, browserDivInput, sectionFilters, disclaimer, resultSection); //meter el div en la section browser

        //BOTONES CHECKBOX FUNCIONAL

        browserButton.addEventListener("click", function () {
            const selectedOption = document.querySelector('input[name="filter"]:checked').value;
            if (selectedOption === "title") {
                getBookByTitle(browserInput.value);
            } else if (selectedOption === "publisher") {
                getBookByPublisher(browserInput.value);
            } else if (selectedOption === "author") {
                getBookByAuthor(browserInput.value);
            } else if (selectedOption === "genre") {
                getBookBySubject(browserInput.value);
            }
        })

        browserInput.addEventListener("keydown", function (event){
            let code = event.key;
            const selectedOption = document.querySelector('input[name="filter"]:checked').value;
            if (code === 'Enter'){
                if (selectedOption === "title") {
                    getBookByTitle(browserInput.value);
                } else if (selectedOption === "publisher") {
                    getBookByPublisher(browserInput.value);
                } else if (selectedOption === "author") {
                    getBookByAuthor(browserInput.value);
                } else if (selectedOption === "genre") {
                    getBookBySubject(browserInput.value);
                }
            }
        });
        
    }

    initializeWishlist(){
        const wishlistImg = document.createElement("img");
        wishlistImg.setAttribute("src", "./assets/wishlist-img.jpg");
        wishlistImg.setAttribute("id", "wishlist-img");

        const wishlistSection = document.getElementById("wishlist");
        const tituloWishlist = document.createElement('h1');
        tituloWishlist.textContent = "WISHLIST";
        wishlistSection.innerHTML = "";
        const wishlistLocalStorage = getFromLocalStorage("favorites") || []; //si hay wishlist la carga, si no, array vacío
        const wishlistLocalStorageDiv = document.createElement("div");
        wishlistLocalStorageDiv.setAttribute("id", "wishlist__books");
        wishlistSection.append(wishlistImg, tituloWishlist, wishlistLocalStorageDiv);
        displayFavoriteBooks(wishlistLocalStorage);
        
    }
}
