import Carousel from './Carousel.js';

/**
 * Composant Vue
 * Représente une section complète d'une catégorie de médias
 * Agit comme un composant parent qui enveloppe un titre et instancie un composant Carousel
 */
export default class CategorySection {
    /**
     * Crée et affiche une nouvelle section de catégorie
     * @param {HTMLElement} container L'élément HTML parent dans lequel la section sera injectée
     * @param {string} title Le titre de la section affiché au-dessus du carrousel
     * @param {Array<Object>} data Le tableau de données (Film / TV) à transmettre au carrousel
     */
    constructor(container, title, data) {
        this.container = container;
        this.title = title;
        this.data = data;
        
        if (!this.container) return;

        this.render();
    }

    render() {
        // ajout de la section avec le titre
        const section = document.createElement('section');
        section.className = 'category-section';

        section.innerHTML = `
            <h1 class="title-script">${this.title}</h1>

            <div class="carousel-container">
            
            </div> 
        `;

        this.container.appendChild(section);

        // ajout du carousel
        const carousel = section.querySelector('.carousel-container');
        new Carousel(carousel, this.data); 
    }
}