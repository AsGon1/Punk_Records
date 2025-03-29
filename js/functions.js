import { MangaHTML, AnimeHTML } from "./classesHTML.js";

function toggleNav() { //para hamburguesa
    let nav = document.querySelector(".menu__burger-links");
	console.log(nav);
    nav.classList.toggle("active");
}

function displayBook(books) {
    const resultSection = document.getElementById("browser__results");
    resultSection.innerHTML = ""; //si hemos hecho búsqueda anterior, la borra
    books.forEach(book => {
        const volumeInfo = book.volumeInfo;
        const bookId = book.id;
        const bookCard = new BookHTML(
            bookId,
            volumeInfo.title,
            volumeInfo.publishedDate,
            volumeInfo.pageCount,
            volumeInfo.language,
            volumeInfo.categories,
            volumeInfo.description,
            volumeInfo.imageLinks,
            volumeInfo.authors,
            volumeInfo.infoLink
        )
        if (!volumeInfo.imageLinks) { //si no hay foto, no lo enseñes
            return
        } else {
            bookCard.initialize(resultSection);
        }
    });
}

function displayFavoriteMangas(readMangas, noReadMangas) {
    const resultSection = document.getElementById("favorite__mangass");
    resultSection.innerHTML = "";
    readMangas.forEach(manga => {
        if (!manga.imageLinks) { //si no hay foto, no lo enseñes
            return
        } else {
            manga.initialize(resultSection);
        }
    });

    noReadMangas.forEach(manga => {
        if (!manga.imageLinks) { //si no hay foto, no lo enseñes
            return
        } else {
            manga.initialize(resultSection);
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
    displayBook,
    displayFavoriteMangas,
	showSection
}