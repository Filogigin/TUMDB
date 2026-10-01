/**
 * composant d'affichage des détails d'un film ou série -> gère le rendu des informations dans la page de détails
 */
export default class InfoFilm {
    /**
     * créer une nouvelle instance InfoFilm et lance le rendu
     * * @param {Object} data Les données du film ou série (instance film ou TV)
     */
    constructor(data) {
        this.data = data;
        this.render();
    }

    render() {
        // Formatage de données (Note sur 10)
        const rating = this.data.vote ? this.data.vote.toFixed(1) : 'N/A';
        // L'Affiche
        const posterEl = document.getElementById('film-poster');
        if (posterEl) {
            posterEl.src = this.data.posterUrl;
            posterEl.alt = `Affiche de ${this.data.title}`;
        }

        // Le Titre
        const titleEl = document.getElementById('film-title');
        if (titleEl) titleEl.textContent = this.data.title;

        // La note
        const ratingEl = document.getElementById('film-rating');
        if (ratingEl) ratingEl.textContent = rating;

        // La date
        const dateEl = document.getElementById('film-release-date');
        if (dateEl) {
            const date = this.data.formattedDate || this.data.releaseYear || 'Inconnue';
            dateEl.textContent = `Date de sortie : ${date}`;
        }

        // Le synopsis
        const synopsisEl = document.getElementById('film-synopsis-text');
        if (synopsisEl) synopsisEl.textContent = this.data.overview;

        // Les genres (la petite liste)
        const genresListEl = document.getElementById('film-genres-list');
        if (genresListEl) {
            if (this.data.genres && this.data.genres.length > 0) {
                // Si on a des genres, on crée des <li> à l'intérieur du <ul>
                genresListEl.innerHTML = this.data.genres.map(genre => `<li>${genre.name || genre}</li>`).join('');
            } else {
                genresListEl.innerHTML = '<li>Non renseigné</li>';
            }
        }
    }
}