import { Manga, Anime, Character } from "./classes.js";


class MangaHTML extends Manga {
    constructor(id, title, format = "Manga", chapters, volumes,status, startDate, coverImage, description, genres, characters) {
        super(id, title, format, chapters, volumes,status, startDate, coverImage, description, genres, characters);
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
        super.saveFav();
        this.article.classList.add("readmark");
    }

    // FUNCION BORRAR FAVORITOS
    removeRead() {
        super.removeFav();
        this.article.classList.remove("readmark");
    }

    // VISUALIZACION DE ELEMENTOS. Tarjetas de libros
    render() {
        const isBookmark = findInLocalStorageArray("favoriteMangas", this);
        this.article.innerHTML = "";

        const image = document.createElement("img");
        const attributesTitle = document.createElement("h3");
        const attributeFormat = document.createElement("h4");

        const attributeList = document.createElement("ul");
        const attributesStartDate = document.createElement("li");
        const attributesChapters = document.createElement("li");
        const attributesVolumes = document.createElement("li");
        const attributesDescription = document.createElement("li");

        const attributesGenres = document.createElement("ul");
        attributesGenres.style.display = "none";

        const favButton = document.createElement("button");

        image.setAttribute("src", this.coverImage.large);
        attributesTitle.textContent = this.title;

        attributeList.classList.add("Manga__attributes");

        attributeAuthors.classList.add("attribute", "author");
        attributeAuthors.textContent = "Autorx: " + this.authorsNames(this.authors);

        attributesPublisherDate.classList.add("attribute", "date");
        attributesPublisherDate.textContent = "Fecha de publicación: " + this.publisherDate;

        attributesPageCount.classList.add("attribute", "pages");
        attributesPageCount.textContent = "Páginas: " + this.pageCount;

        attributesLanguage.classList.add("attribute", "language");
        attributesLanguage.textContent = "Idioma: " + this.language;

        attributesDescription.classList.add("attribute", "description");
        attributesDescription.textContent = "Sinopsis: " + this.description;

        attributesCategories.classList.add("attribute", "categories");
        attributesCategories.textContent = this.createCategories(attributesCategories);

        attributesInfoLink.classList.add("attribute", "info");
        attributesInfoLink.textContent = "MÁS INFO";
        attributesInfoLink.setAttribute("href", this.infoLink);
        attributesInfoLink.setAttribute("target", "_blank");

        if (isBookmark) {
            wishButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>`; // TODO INNERHTML icono
        } else {
            wishButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>`; // TODO INNERHTML icono
        }

        wishButton.addEventListener("click", () => {
            if (isBookmark) {
                this.removeFav();
                removeFromLocalStorageArray("favorites", this);
				const wishlistLocalStorage = getFromLocalStorage("favorites") || [];
				displayFavoriteBooks(wishlistLocalStorage);
            } else {
                this.saveFav();
                console.log(this);
                addToLocalStorageArray("favorites", this);
            }
            this.render();
        })

        attributeList.append(attributesPublisherDate, attributesPageCount, attributesLanguage, attributesDescription);

        this.article.appendChild(image);
        this.article.appendChild(attributesTitle);
        this.article.appendChild(attributeAuthors);
        this.article.appendChild(attributeList);

        // CREACION DE LISTA DE CATEGORIAS
        if (attributesCategories.length === 1) { // SI SOLO HAY UNA CATEGORIA SE CREA UN ELEMENTO "A"
            const category = document.createElement("a");
        } else {
            this.createCategories(attributesCategories);
        }
        this.article.appendChild(attributesCategories);

        this.article.appendChild(wishButton);
        
        this.article.appendChild(attributesInfoLink);
    }

    // AÑADIDO DE NOMBRES DE AUTORES A UN MISMO STRING
    authorsNames(array) {
        let authorsNamesString = "";

        if (array.length === 1) {
            return array[0];
        }

        for (let i = 0; i < array.length; i++) {
            authorsNamesString += array[i] + (i === array.length - 1) ? "" : ", ";
        }

        return authorsNamesString;
    }

    // AÑADIDO DE TODAS LAS CATEGORIAS A LA LISTA EN FUNCION DE LA CANTIDAD
    createCategories(attributesCategories) {
        for (let i = 0; i < this.categories.length; i++) {
            const category = document.createElement("li");
            category.classList.add("attribute", "category");
            if (i === 0) {
                category.textContent = "Géneros: " + this.categories[i];
            } else {
            category.textContent += this.categories[i];
            }
            attributesCategories.append(category);
        }
    }
}