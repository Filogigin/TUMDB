/**
 * contrôleur pour la page d'accueil -> initialise les carousels de tendances, favoris et contenus à venir
 */
import { fetchTrendingMovies, fetchTrendingTV, fetchUpcomingMovies } from '../model/api.js';
import Carousel from '../view/Carousel.js';
import CarouselHero from '../view/CarouselHero.js';
import { getFavorites } from '../utils/favorites.js';
import Film from '../model/Film.js';
import TV from '../model/TV.js';

const tendingMovies = await fetchTrendingMovies('day');
const tendingTV = await fetchTrendingTV('day');
const upcomingMovies = await fetchUpcomingMovies();

const heroBanner = document.querySelector('#hero-banner')
const favoris = document.querySelector('#favoris-home')
const soon = document.querySelector('#soon-home')
const film = document.querySelector('#film-home')
const tv = document.querySelector('#tv-home')

new CarouselHero(heroBanner, tendingMovies);

const favoritesData = getFavorites();
if (favoritesData.length > 0) {
    const favoritesMedia = favoritesData.map(fav => {
        if (fav.mediaType === 'tv') {
            return new TV({
                id: fav.id,
                name: fav.title,
                first_air_date: fav.releaseDate,
                poster_path: fav.posterPath,
                vote_average: fav.vote
            });
        } else if (fav.mediaType === 'movie') {
            return new Film({
                id: fav.id,
                title: fav.title,
                release_date: fav.releaseDate,
                poster_path: fav.posterPath,
                vote_average: fav.vote
            });
        }
    });
    new Carousel(favoris, favoritesMedia);
} else {
    favoris.style.display = 'none';
}

new Carousel(soon, upcomingMovies);
new Carousel(film, tendingMovies);
new Carousel(tv, tendingTV);