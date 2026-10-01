/**
 * @file main.js
 * Ce script est chargé sur toutes les pages pour initialiser les composants commun
 */
import Searchbar from './view/Searchbar.js';

const searchbar = document.querySelector('.search-container')
new Searchbar(searchbar);