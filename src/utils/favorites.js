const STORAGE_KEY = 'tumdb_favorites';

/**
 * Récupère tous les favoris depuis le localStorage
 * @returns {Array} Liste des médias favoris
 */
export function getFavorites() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

/**
 * Sauvegarde les favoris dans le localStorage
 * @param {Array} favorites - Liste des favoris à sauvegarder
 */
function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

/**
 * Vérifie si un média est dans les favoris
 * @param {number} id - ID du média
 * @param {string} mediaType - Type du média ('movie' ou 'tv')
 * @returns {boolean} true si le média est en favoris
 */
export function isFavorite(id, mediaType) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === id && fav.mediaType === mediaType);
}

/**
 * Ajoute un média aux favoris
 * @param {Object} media - Le média à ajouter (doit avoir : id, title, posterPath, releaseDate, vote, mediaType)
 */
export function addFavorite(media) {
    const favorites = getFavorites();

    // Vérifier si le média n'est pas déjà dans les favoris
    if (isFavorite(media.id, media.mediaType)) {
        return;
    }

    // Extraire uniquement les propriétés nécessaires
    const favoriteData = {
        id: media.id,
        title: media.title || 'Titre inconnu',
        posterPath: media.posterPath || null,
        releaseDate: media.releaseDate || '',
        vote: media.vote || 0,
        mediaType: media.mediaType
    };
    favorites.push(favoriteData);
    saveFavorites(favorites);
}

/**
 * Retire un média des favoris
 * @param {number} id - ID du média
 * @param {string} mediaType - Type du média ('movie' ou 'tv')
 */
export function removeFavorite(id, mediaType) {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => !(fav.id === id && fav.mediaType === mediaType));
    saveFavorites(filtered);
}

/**
 * Toggle l'état favori d'un média
 * @param {Object} media - Le média à toggle
 * @returns {boolean} true si le média a été ajouté, false s'il a été retiré
 */
export function toggleFavorite(media) {
    if (isFavorite(media.id, media.mediaType)) {
        removeFavorite(media.id, media.mediaType);
        return false;
    } else {
        addFavorite(media);
        return true;
    }
}
