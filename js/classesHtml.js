import { Manga, Anime, Character } from "./classes.js";
import { addToLocalStorageArray, getMangaFromLocalStorage, getAnimeFromLocalStorage, removeFromLocalStorageArray, findInLocalStorageArray } from "./localstorage.js";


class MangaHTML extends Manga {
    constructor(id, title, format = "Manga", chapters, volumes,status, startDate, coverImage, description, genres) {
        super(id, title, format, chapters, volumes,status, startDate, coverImage, description, genres);
        this.article = null;
    }

    // CREACION DE ARTICLES QUE REPRESENTA A CADA TARJETA DE LIBRO
    createHTML(fatherElement) {
        this.article = document.createElement("article");
        this.article.classList.add("Manga", "card");

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
        const isBookmark = findInLocalStorageArray("favoriteReadMangas", this);
        const isNotBookmark = findInLocalStorageArray("favoriteNoReadMangas", this);
        this.article.innerHTML = "";

        const image = document.createElement("img");
        const attributesTitle = document.createElement("h3");
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
        attributesTitle.textContent = this.title;
        attributesFormat.textContent = this.format;

        attributeList.classList.add("Manga__attributes");

        attributesStartDate.classList.add("attribute", "date");
        attributesStartDate.textContent = "Publishing Date: " + this.publisherDate;

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
            readButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>`;
        } else if (isNotBookmark || !this.read){
            readButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
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

        this.article.appendChild(image);
        this.article.appendChild(attributesTitle);
        this.article.appendChild(attributesFormat);
        this.article.appendChild(attributeList);

        // CREACION DE LISTA DE CATEGORIAS
        if (attributesGenres.length === 1) { // SI SOLO HAY UNA CATEGORIA SE CREA UN ELEMENTO "h5"
            const genre = document.createElement("h5");
        } else {
            this.createGenres(attributesGenres);
        }
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

    // CREACION DE ARTICLES QUE REPRESENTA A CADA TARJETA DE LIBRO
    createHTML(fatherElement) {
        this.article = document.createElement("article");
        this.article.classList.add("Anime", "card");

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

    // VISUALIZACION DE ELEMENTOS. Tarjetas de mangas
    render() {
        const isBookmark = findInLocalStorageArray("favoriteViewedAnime", this);
        const isNotBookmark = findInLocalStorageArray("favoriteNoViewedAnime", this);
        this.article.innerHTML = "";

        const image = document.createElement("img");
        const attributesTitle = document.createElement("h3");
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
        attributesTitle.textContent = this.title;
        attributesFormat.textContent = this.format;

        attributeList.classList.add("Manga__attributes");

        attributesStartDate.classList.add("attribute", "date");
        attributesStartDate.textContent = "Publishing Date: " + this.publisherDate;

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
            readButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>`;
        } else if (isNotBookmark || !this.read){
            readButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
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

        this.article.appendChild(image);
        this.article.appendChild(attributesTitle);
        this.article.appendChild(attributesFormat);
        this.article.appendChild(attributeList);

        // CREACION DE LISTA DE CATEGORIAS
        if (attributesGenres.length === 1) { // SI SOLO HAY UNA CATEGORIA SE CREA UN ELEMENTO "h5"
            const genre = document.createElement("h5");
        } else {
            this.createGenres(attributesGenres);
        }
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