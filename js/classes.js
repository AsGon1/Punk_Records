class Manga {

    constructor(id, title, format = "Manga", chapters, volumes, status, startDate, coverImage, description, genres){

        this.id = id;
        this.title = title;
        this.format = format; // Guarda el formato de la obra
        this.status = status || "UNKNOWN"; // Estado en el que se encuentra la obra, en publicación o no.
        this.startDate = startDate || "UNKNOWN"; // Fecha de inicio de la obra (objeto: day, month, year)
        this.coverImage = coverImage; // Objeto que guarda las cover image (extra large, large y medium)
        this.description = description || "Description: UNKNOWN";
        this.genres = genres || "UNKNOWN"; // array que guarda los generos de la obra
        this.chapters = chapters || "UNKNOWN"; // numero de capitulos de la obra
        this.volumes = volumes || status; // numero de volumenes si esta acabada o su estado en caso contrario

        this.fav = false; // Nos indica si la obra esta en favoritos o no
        this.read = false; // Nos indica si la obra se ha leido o no (por defecto se considera que no se ha leido)

    }

    // FUNCION GUARDAR FAVORITOS
    saveFav() {
        if(this.fav) {
            return;
        }
        this.fav = true;
    }

    // FUNCION BORRAR FAVORITOS
    removeFav() {
        if(!this.fav) {
            return;
        }
        this.fav = false;
    }

    // FUNCION INDICAR LEIDO
    saveRead() {
        if(this.read) {
            return;
        }
        this.read = true;
    }

    // FUNCION BORRAR LEIDO
    removeRead() {
        if(!this.read) {
            return;
        }
        this.read = false;
    }
}

class Anime {

    constructor(id, title, format = "Anime", episodes, duration, status, startDate, coverImage, description, genres){

        this.id = id;
        this.title = title;
        this.format = format; // Guarda el formato de la serie
        this.status = status || "UNKNOWN"; // Estado en el que se encuentra la obra, en emision o no.
        this.startDate = startDate || "UNKNOWN"; // Fecha de inicio de la serie (objeto: day, month, year)
        this.coverImage = coverImage || "UNKNOWN"; // Objeto que guarda las cover image (extra large, large y medium)
        this.description = description || "UNKNOWN";
        this.genres = genres || "UNKNOWN"; // array que guarda los generos de la serie
        this.episodes = episodes || "UNKNOWN"; // numero de capitulos de la obra
        this.duration = duration || "UNKNOWN"; // duracion media de los capitulos

        this.fav = false; // Nos indica si la serie esta en favoritos o no
        this.watched = false; // Nos indica si la serie se ha visto o no (por defecto se considera que no se ha visto)

    }

    // FUNCION GUARDAR FAVORITOS
    saveFav() {
        if(this.fav) {
            return;
        }
        this.fav = true;
    }

    // FUNCION BORRAR FAVORITOS
    removeFav() {
        if(!this.fav) {
            return;
        }
        this.fav = false;
    }

    // FUNCION GUARDAR VISTO
    saveViewed() {
        if(this.watched) {
            return;
        }
        this.watched = true;
    }

    // FUNCION BORRAR VISTO
    removeViewed() {
        if(!this.watched) {
            return;
        }
        this.watched = false;
    }
}

class Character {

    constructor (id, name, age, gender, description, dateOfBirth, image){

        this.id = id;
        this.name = name;
        this.age = age || "N/A"; // Guarda la edad del personage
        this.gender = gender || "N/A"; // Guarda el genero del personaje
        this.dateOfBirth = dateOfBirth || "N/A"; // Fecha de nacimiento del personaje
        this.image = image; // Objeto que guarda las cover image (extra large, large y medium)
        this.description = description || "Without information"; //descripcion del personaje

    }

}

export {
    Manga,
    Anime,
    Character
}