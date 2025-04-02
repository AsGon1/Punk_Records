import { MangaHTML, AnimeHTML } from "./classesHtml.js";


// Guardar objetos en LocalStorage
function saveToLocalStorage (toberead, manga) {
	const stringObject = JSON.stringify(manga);
	localStorage.setItem(toberead, stringObject);
}

// Recuperar todos los mangas guardados en el LocalStorage
function getMangaFromLocalStorage (toberead) {
	const resultString = localStorage.getItem(toberead);
	const resultJSON = JSON.parse(resultString);
	const result = [];
	if(resultJSON !== null) {
		resultJSON.forEach(manga => { //crear un array de libros con el formato bookhtml
			const mangaCard = new MangaHTML (
				manga.id,
				manga.title,
				manga.format,
				manga.chapters,
				manga.volumes,
				manga.status,
				manga.startDate,
				manga.coverImage,
				manga.description,
				manga.genres,
			)
			result.push(mangaCard);
		});
	}
	
	return result;
}

// Recuperar todos los animes guardados en el LocalStorage
function getAnimeFromLocalStorage (toberead) {
	const resultString = localStorage.getItem(toberead);
	const resultJSON = JSON.parse(resultString);
	const result = [];
	if(resultJSON !== null) {
		resultJSON.forEach(anime => { //crear un array de libros con el formato bookhtml
			const animeCard = new AnimeHTML (
				anime.id,
				anime.title,
				anime.format,
				anime.episodes,
				anime.duration,
				anime.status,
				anime.startDate,
				anime.coverImage,
				anime.description,
				anime.genres,
			)
			result.push(animeCard);
		});
	}
	
	return result;
}

// Añadir objetos al array guardado en LocalStorage
function addMangaToLocalStorageArray (toberead, item) {

	const array = getMangaFromLocalStorage(toberead) || [];
	
	const index = array.findIndex(element => element.id === item.id);
	if (index !== -1) {
		return;
	}
	array.push(item);
	saveToLocalStorage(toberead, array);
}

function addAnimeToLocalStorageArray (toberead, item) {

	const array = getAnimeFromLocalStorage(toberead) || [];
	
	const index = array.findIndex(element => element.id === item.id);
	if (index !== -1) {
		return;
	}
	array.push(item);
	saveToLocalStorage(toberead, array);
}

// Eliminar objetos del array guardado en LocalStorage
function removeMangaFromLocalStorageArray (toberead, item) {
	const array = getMangaFromLocalStorage(toberead);
	if (!array) {
		return;
	}
	const index = array.findIndex(element => element.id === item.id);
	if (index === -1) {
		return;
	}
	array.splice(index, 1);
	saveToLocalStorage(toberead, array);
}

function removeAnimeFromLocalStorageArray (toberead, item) {
	const array = getAnimeFromLocalStorage(toberead);
	if (!array) {
		return;
	}
	const index = array.findIndex(element => element.id === item.id);
	if (index === -1) {
		return;
	}
	array.splice(index, 1);
	saveToLocalStorage(toberead, array);
}

// Buscar Manga en lo guardado en el LocalStorage
function findMangaInLocalStorageArray (toberead, manga) {
	const array = getMangaFromLocalStorage(toberead) || [];
	return array.find(element => element.id === manga.id);
}

// Buscar Manga en lo guardado en el LocalStorage
function findAnimeInLocalStorageArray (toberead, anime) {
	const array = getAnimeFromLocalStorage(toberead) || [];
	return array.find(element => element.id === anime.id);
}


export {
	saveToLocalStorage,
	getMangaFromLocalStorage,
    getAnimeFromLocalStorage,
	addMangaToLocalStorageArray,
	removeMangaFromLocalStorageArray,
	addAnimeToLocalStorageArray,
	removeAnimeFromLocalStorageArray,
	findMangaInLocalStorageArray,
	findAnimeInLocalStorageArray
}