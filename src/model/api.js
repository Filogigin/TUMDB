/**
 * module de communication avec l'API -> contient toutes les fonctions pour récupérer les données des films et séries
 */
import Film from './Film.js';
import TV from './TV.js';

const API_KEY = '';
// CLEF API DE TMDB (The Movie Database) (https://www.themoviedb.org/settings/api)
//  ->  impossible de mettre dans un .env, puisqu'on host sur "GitHub Pages", il sera donc visible dans le code source JS.

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export async function fetchTrendingMovies(timeWindow = 'day') {
    const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=fr-FR`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results.map(movieData => new Film(movieData));
}

export async function fetchTrendingTV(timeWindow = 'day') {
    const url = `https://api.themoviedb.org/3/trending/tv/${timeWindow}?language=fr-FR`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results.map(tvData => new TV(tvData));
}

export async function fetchMovieDetails(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
    const res = await fetch(url, options);
    const movieData = await res.json();

    return new Film(movieData);
}

export async function fetchTVDetails(id) {
    const url = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`;
    const res = await fetch(url, options);
    const tvData = await res.json();

    return new TV(tvData);
}

/**
 * recherche de films et séries par terme
 * filtre et transforme les résultats selon leur type (movie ou tv)
 * * @param {string} search Le terme de recherche
 * * @returns {Array} Tableau d'objets Film ou TV selon le type de résultat
 */
export async function fetchSearchMovie(search) {
    const url = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=fr-FR&page=1`;
    const res = await fetch(url, options);
    const data = await res.json();

    if (!data.results) return [];

    const medias = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');

    return medias.map(itemData => {
        if (itemData.media_type === 'tv') {
            return new TV(itemData);
        } else {
            return new Film(itemData);
        }
    });
}


/**
 * récupère les crédits (acteurs) et les formate pour être affichables dans un carousel
 * transforme les données de l'API pour correspondre au format attendu par le composant Carousel
 * * @param {string|number} id Identifiant du film ou série
 * * @param {string} type Type de média ('movie' ou 'tv')
 * * @returns {Array} Tableau d'acteurs formatés (max 15) avec les propriétés nécessaires au carousel
 */
export async function fetchCredits(id, type) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?language=fr-FR`;
    const res = await fetch(url, options);
    const data = await res.json();

    if (!data.cast) return [];


    // on formate les acteurs pour qu'ils puissent être affichés dans un carousel
    // puisque le carroussel attends des propriétés spécifiques (id, title, formattedDate, posterUrl, mediaType), on map les données de l'api pour les faire correspondre
    return data.cast.slice(0, 15).map(actor => ({
        id: actor.id,
        title: actor.name,
        formattedDate: actor.character ? `Rôle : ${actor.character}` : '',
        posterUrl: actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : './public/images/poster_not_found.png',
        mediaType: 'person'

    }));
}

/**
 * récupère les noms des réalisateurs/créateurs selon le type de média
 * pour les séries tv: récupère les créateurs (created_by)
 * pour les films : récupère les réalisateurs dans les crédits (job: 'Director')
 * * @param {string|number} id Identifiant du film ou série
 * * @param {string} type Type de média ('movie' ou 'tv')
 * * @returns {string} Noms des réalisateurs séparés par des virgules, ou "Non renseigné"
 */
export async function fetchDirectors(id, type) {


    if (type === 'tv') { 
            const url = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`;
            const res = await fetch(url, options);
            const data = await res.json();
            
            if (data.created_by && data.created_by.length > 0) {
                return data.created_by.map(c => c.name).join(', ');
            } else {
                return "Non renseigné";
            }
    }
    else if (type === 'movie') {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=fr-FR`;
        const res = await fetch(url, options);
        const data = await res.json();

        if (!data.crew) return "Non renseigné";

        const directors = data.crew.filter(person => person.job === 'Director');

        if (directors.length > 0) {
            // S'il y a plusieurs réalisateurs (ex: Les frères Russo), on les sépare par une virgule
            return directors.map(d => d.name).join(', ');
        } else {
            return "Non renseigné";
        }
    }

}
// categroies films / series

export async function fetchPopular(type) {
    const url = `https://api.themoviedb.org/3/${type}/popular?language=fr-FR&page=1`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results ? data.results.map(item => type === 'tv' ? new TV(item) : new Film(item)) : [];
}

export async function fetchTopRated(type) {
    const url = `https://api.themoviedb.org/3/${type}/top_rated?language=fr-FR&page=1`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results ? data.results.map(item => type === 'tv' ? new TV(item) : new Film(item)) : [];
}

// categroie series

export async function fetchAiringTodayTV() {
    const url = `https://api.themoviedb.org/3/tv/airing_today?language=fr-FR&page=1`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results ? data.results.map(item => new TV(item)) : [];
}

export async function fetchOnTheAirTV() {
    const url = `https://api.themoviedb.org/3/tv/on_the_air?language=fr-FR&page=1`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results ? data.results.map(item => new TV(item)) : [];
}
// categroie films

export async function fetchNowPlayingMovies() {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results ? data.results.map(item => new Film(item)) : [];
}

export async function fetchUpcomingMovies() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results ? data.results.map(item => new Film(item)) : [];
}

export async function fetchRecommendationsMovies(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?language=fr-FR`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results ? data.results.map(item => new Film(item)) : [];
}

export async function fetchRecommendationsTV(series_id) {
    const url = `https://api.themoviedb.org/3/tv/${series_id}/recommendations?language=fr-FR`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data.results ? data.results.map(item => new TV(item)) : [];
}



