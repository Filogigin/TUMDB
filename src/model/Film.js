/**
 * Représente une entité métier Film
 */
export default class Film {
    /**
     * Crée un nouveau Film
     * @param {Object} data Les données renvoyées par l'API
     * @param {number} data.id L'identifiant unique du film
     * @param {string} [data.title] Le titre du film de l'API
     * @param {string} [data.name] Le titre du film si il est contenu dans name
     * @param {string} [data.overview] Le résumé ou synopsis du film
     * @param {string} [data.release_date] La date de sortie en salle (YYYY-MM-DD)
     * @param {string} [data.poster_path] Le chemin vers l'affiche
     * @param {number} [data.vote_average] La note moyenne sur 10
     * @param {Array} [data.genres] La liste des genres du film
     */
    constructor(data) {
        this.id = data.id;
        this.title = data.title || data.name || 'Titre inconnu'; 
        this.overview = data.overview || 'Pas de description disponible.';
        this.releaseDate = data.release_date || data.first_air_date || ''; 
        this.posterPath = data.poster_path;
        this.vote = data.vote_average || 0;
        this.mediaType = 'movie';
        this.genres = data.genres || [];
    }

    /**
     * Récupère l'URL complète de l'affiche de la série ou le chemin vers une image par défaut si introuvable
     * * @returns {string} L'URL absolue de l'image
     */
    get posterUrl() {
        return this.posterPath 
            ? `https://image.tmdb.org/t/p/w500${this.posterPath}` 
            : '../public/images/poster_not_found.png';
    }

    /**
     * Formate la date de première diffusion
     * * @returns {string} La date formatée en "JJ/MM/AAAA" ou renvoie "Inconnue" si la date est absente
     */
    get formattedDate() {
        if (!this.releaseDate) return 'Inconnue';
        return this.releaseDate.split("-").reverse().join("/");
    }
}