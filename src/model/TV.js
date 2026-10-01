/**
 * Représente une entité métier Série TV
 */
export default class TV {
    /**
     * Crée une nouvelle série TV.
     * @param {Object} data Les données renvoyées par l'API
     * @param {number} data.id L'identifiant unique de la série
     * @param {string} [data.name] Le nom de la série
     * @param {string} [data.overview] Le résumé ou synopsis.
     * @param {string} [data.first_air_date] La date de première diffusion
     * @param {string} [data.poster_path] Le chemin vers l'affiche
     * @param {number} [data.vote_average] La note moyenne sur 10
     * @param {Array} [data.genres] La liste des genres associés
     */
    constructor(data) {
        this.id = data.id;
        this.title = data.name || 'Titre inconnu'; 
        this.overview = data.overview || 'Pas de description disponible.';
        this.releaseDate = data.first_air_date || ''; 
        this.posterPath = data.poster_path;
        this.vote = data.vote_average || 0;
        this.mediaType = 'tv';
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