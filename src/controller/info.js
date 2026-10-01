/**
 * contrôleur pour la page de détails d'un film ou série > gestion de l'affichage des informations détaillées et interactions d'un film / série tv
 */
import { fetchMovieDetails, fetchTVDetails, fetchCredits, fetchDirectors, fetchRecommendationsMovies, fetchRecommendationsTV } from '../model/api.js';
import InfoFilm from '../view/infoFilm.js';
import Carousel from '../view/Carousel.js';
import { isFavorite, toggleFavorite } from '../utils/favorites.js';

/**
 * iitialise la page de détails en récupérant et affichant toutes les informations d'un média (film ou série tv)
 * Gère aussi l'affichage des acteurs, réalisateurs et recommandations
 */
async function initDetailsPage() {
    const params = new URLSearchParams(window.location.search);
    const mediaId = params.get('id');
    const mediaType = params.get('type') || 'movie';

    const actors = document.getElementById('actors-info');
    const directors = document.getElementById('film-director-name');
    const recommendationsSection = document.getElementById('recommendations');

    if (!mediaId) return;

    let mediaData;
    let recommendations = [];
    if (mediaType === 'tv') {
        mediaData = await fetchTVDetails(mediaId);
        recommendations = await fetchRecommendationsTV(mediaId)
    } else {
        mediaData = await fetchMovieDetails(mediaId);
        recommendations = await fetchRecommendationsMovies(mediaId)
    }

    if (!mediaData) {
        alert("Contenu introuvable.");
        return;
    }

    new InfoFilm(mediaData);

    if (recommendationsSection && recommendations.length > 0) {
        new Carousel(recommendationsSection, recommendations);
    }

    if (actors) {
        const actorsData = await fetchCredits(mediaId, mediaType);
        
        if (actorsData && actorsData.length > 0) {
            new Carousel(actors, actorsData);
        } else {
            actors.style.display = 'none';
        }
    }
    
    if (directors) {
        const directorsData = await fetchDirectors(mediaId, mediaType);
        directors.textContent = directorsData;
    }

    // Gestion du bouton favoris
    initFavoriteButton(mediaData);
}

/**
 * Initialise le bouton favoris : met à jour son apparence selon l'état actuel et gère les clics
 * * @param {Object} mediaData Les données du média pour gérer les favoris
 */
function initFavoriteButton(mediaData) {
    const favoriteBtn = document.getElementById('film-favorite-btn');
    if (!favoriteBtn) return;

    const svgPath = favoriteBtn.querySelector('svg path');

    // Fonction pour mettre à jour l'apparence du bouton
    function updateButtonState() {
        const isInFavorites = isFavorite(mediaData.id, mediaData.mediaType);
        if (isInFavorites) {
            svgPath.setAttribute('fill', 'currentColor');
            favoriteBtn.setAttribute('aria-label', 'Retirer des favoris');
        } else {
            svgPath.setAttribute('fill', 'none');
            favoriteBtn.setAttribute('aria-label', 'Ajouter aux favoris');
        }
    }
    updateButtonState();

    // Gestion du clic
    favoriteBtn.addEventListener('click', () => {
        toggleFavorite(mediaData);
        updateButtonState();
    });
}

initDetailsPage();