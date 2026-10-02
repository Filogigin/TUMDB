# TUMDB

Projet étudiant de 2ème année (BUT Informatique, ressource R4.10), réalisé en binôme par **Enzo G.** et **Nicolas G.**

TUMDB est un site web de type catalogue (à la manière de Netflix / Letterboxd) qui consomme l'API REST **[TMDB](https://www.themoviedb.org/)** (The Movie Database) pour afficher des films, des séries et leurs acteurs.

## Fonctionnalités

- **Accueil** : bannière des films tendances, tendances films & séries du jour, sorties à venir, et vos favoris.
- **Catalogue** (`catalogue.html?type=movie` ou `?type=tv`) : carrousels par catégorie (populaires, mieux notés, au cinéma, à venir, diffusés aujourd'hui, en cours de diffusion).
- **Fiche détaillée** (`info.html?id=<id>&type=<movie|tv>`) : synopsis, genres, note, réalisateur(s) / créateur(s), casting et recommandations.
- **Recherche** multi (films + séries) via la barre de recherche présente sur toutes les pages.
- **Favoris** enregistrés localement dans le navigateur (`localStorage`).

## Stack technique

- HTML / CSS / JavaScript **vanilla** (modules ES), sans framework ni dépendance.
- Architecture **MVC** :
  - `src/model/` : appels à l'API (`api.js`) et entités métier (`Film`, `TV`)
  - `src/view/` : composants d'affichage (carrousels, barre de recherche, fiche détaillée…)
  - `src/controller/` : un contrôleur par page (`home`, `catalogue`, `info`)
  - `src/utils/` : helpers DOM et gestion des favoris

## L'API TMDB

Toutes les requêtes passent par `src/model/api.js`, en `GET` avec authentification **Bearer token** (API Read Access Token) et `language=fr-FR`.

| Usage | Endpoint |
| --- | --- |
| Tendances | `/trending/{movie\|tv}/{day\|week}` |
| Détails | `/movie/{id}`, `/tv/{id}` |
| Recherche | `/search/multi?query=...` |
| Casting / réalisateurs | `/{movie\|tv}/{id}/credits` |
| Recommandations | `/{movie\|tv}/{id}/recommendations` |
| Populaires / mieux notés | `/{movie\|tv}/popular`, `/{movie\|tv}/top_rated` |
| Films | `/movie/now_playing`, `/movie/upcoming` |
| Séries | `/tv/airing_today`, `/tv/on_the_air` |

Les images sont chargées depuis `https://image.tmdb.org/t/p/w500/...`.

## Lancer le projet

1. Créez un compte sur [themoviedb.org](https://www.themoviedb.org/) et récupérez votre **API Read Access Token** dans [Paramètres → API](https://www.themoviedb.org/settings/api).
2. Collez-le dans `src/model/api.js` :
   ```js
   const API_KEY = 'votre_token_ici';
   ```
3. Servez le dossier avec un serveur local (les modules ES ne fonctionnent pas en `file://`), par exemple :
   ```bash
   npx serve .
   # ou
   python3 -m http.server
   ```
   ou avec l'extension **Live Server** de VS Code.
4. Ouvrez `index.html` dans le navigateur.

> ⚠️ Le site étant hébergé sur GitHub Pages (site statique), le token ne peut pas être caché dans un `.env` : il reste visible dans le code source JS.

---

*Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB.*
