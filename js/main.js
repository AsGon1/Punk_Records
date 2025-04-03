import { PunkRecordsHTML } from "./classesHtml.js";
import { showSection, toggleNav, displayFavoriteAnimes, displayFavoriteMangas, displaySuggestions, showHomeSection } from "./functions.js";
import { getMangaFromLocalStorage, getAnimeFromLocalStorage} from "./localstorage.js";

const home_burgerMenu = document.getElementById("home_menu");
home_burgerMenu.addEventListener("click", (e) => {
    showHomeSection('home', 'home__browser', 'home__suggestions');
    displaySuggestions();
});

const browser_burgerMenu = document.getElementById("browser_menu");
browser_burgerMenu.addEventListener("click", (e) => {
	showSection('browser')
    document.getElementById("browser__results").innerHTML = ""
});

const favorite_burgerMenu = document.getElementById("favorites_menu");
favorite_burgerMenu.addEventListener("click", (e) => {
	showSection('favorites');
	const favViewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteViewedAnimes") || [];
    const favNoviewedAnimeListLocalStorage = getAnimeFromLocalStorage("favoriteNoViewedAnimes") || [];
    displayFavoriteAnimes(favViewedAnimeListLocalStorage, favNoviewedAnimeListLocalStorage);

    const favReadMangaListLocalStorage = getMangaFromLocalStorage("favoriteReadMangas") || [];
    const favNoReadMangaListLocalStorage = getMangaFromLocalStorage("favoriteNoReadMangas") || [];
    displayFavoriteMangas(favReadMangaListLocalStorage, favNoReadMangaListLocalStorage);
});

const menu_burgerIcon = document.getElementById("burger_icon");
menu_burgerIcon.addEventListener("click", (e) => {
	toggleNav()
});

const pruebaPunkRecords = new PunkRecordsHTML;