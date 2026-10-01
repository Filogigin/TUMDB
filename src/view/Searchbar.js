import { fetchSearchMovie } from '../model/api.js';
/**
 * Composant Vue
 * Représente un barre de recherche pour trouver des médias
 * Génère le code HTML et gère les événements
 */
export default class Searchbar {
    /**
     * Crée et initialise une nouvelle barre de recherche 
     * @param {HTMLElement} container L'élément HTML parent dans lequel la searchabr sera injecté
     */
    constructor(container) {
        this.container = container;
        this.timeoutId = null; 
        
        this.render();
        this.initEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="searchbar-wrapper">
                <div class="searchbar">
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="search" placeholder="Recherchez un film, une série...">
                </div>
                <div class="list-search" style="display: none;"></div>
            </div>
        `;

        this.searchInput = this.container.querySelector('input');
        this.searchList = this.container.querySelector('.list-search');
    }

    initEvents() {
        this.searchInput.addEventListener("input", (e) => {
            const query = e.target.value.trim();

            clearTimeout(this.timeoutId);

            // ne fetch pas si il n'y a pas 2 caracteres
            if (query.length < 2) {
                this.searchList.style.display = 'none';
                this.searchList.innerHTML = '';
                return;
            }

            // lance le chrono pour les fetchs
            this.timeoutId = setTimeout(async () => {
                const results = await fetchSearchMovie(query);
                this.displayResults(results);
            }, 500); 
        });

        // ferme la liste de recherche si on clique a coté
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.searchList.style.display = 'none';
            }
        });
    }

    displayResults(results) {
        this.searchList.style.display = 'block';

        if (results.length === 0) {
            this.searchList.innerHTML = `<div class="no-results">Aucun résultat trouvé.</div>`;
            return;
        }

        // affiche les 5 premiers résultats
        this.searchList.innerHTML = results.slice(0, 5).map(media => `
            <a href="info.html?id=${media.id}&type=${media.mediaType}" class="search-item">
                <img src="${media.posterUrl}" alt="${media.title}">
                <div class="search-item-info">
                    <h4>${media.title}</h4>
                    <span>${media.formattedDate}</span>
                </div>
            </a>
        `).join('');
    }
}