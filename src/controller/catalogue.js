/**
 * contrôleur pour la page catalogue -> gestion de l'affichage des films et séries par catégories
 */
import { fetchPopular, fetchTopRated, fetchAiringTodayTV, fetchOnTheAirTV, fetchNowPlayingMovies, fetchUpcomingMovies } from '../model/api.js';
import CategorySection from '../view/CategorySection.js';

// on met a jour le active du menu ici pour éviter de recreer un fichier juste pour cela
function updateActiveMenu(currentType) {
    const activeLink = document.querySelector(`.selectors-container a[data-type="${currentType}"]`);
    activeLink.classList.add('active');
}

/**
 * initialise la page catalogue en fonction du type de contenu (films ou séries tv)
 * Récupère les données depuis l'API et crée les carousels de catégories correspondants
 */
async function initCatalogue() {
    const params = new URLSearchParams(window.location.search);
    const contentType = params.get('type');

    // met a jour la nav
    updateActiveMenu(contentType);

    const main = document.querySelector('#catalogue-container')

    if (contentType === 'tv') {
        // recuperation des données
        const popularTV = await fetchPopular('tv');
        const airingTodayTV = await fetchAiringTodayTV();
        const onTheAirTV = await fetchOnTheAirTV();
        const topRatedTV = await fetchTopRated('tv');

        // initialisations des carousels
        new CategorySection(main, 'Séries Populaires', popularTV);
        new CategorySection(main, `Diffusées aujourd'hui`, airingTodayTV);
        new CategorySection(main, 'En cours de diffusion', onTheAirTV);
        new CategorySection(main, 'Les Mieux Évaluées', topRatedTV);
    } else if(contentType === 'movie') {
        // recuperation des données
        const popularMovies = await fetchPopular('movie');
        const nowPlayingMovies = await fetchNowPlayingMovies();
        const upcomingMovies = await fetchUpcomingMovies();
        const topRatedMovies = await fetchTopRated('movie');

        // initialisations des carousels
        new CategorySection(main, 'Films Populaires', popularMovies);
        new CategorySection(main, 'Actuellement au cinéma', nowPlayingMovies);
        new CategorySection(main, 'À Venir', upcomingMovies);
        new CategorySection(main, 'Les Mieux Évalués', topRatedMovies);
    }
}

initCatalogue();