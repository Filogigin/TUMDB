import { createElementWithText } from '../utils/dom.js'

/**
 * Composant Vue
 * Représente un carrousel défilant des médias
 * Génère le code HTML du carrousel et gère les événements de navigation
 */
export default class Carousel {
    /**
     * Crée et initialise un nouveau carrousel
     * @param {HTMLElement} container L'élément HTML parent dans lequel le carrousel sera injecté
     * @param {Array<Object>} data Un tableau d'entités métier (Film / TV) à afficher dans le carrousel
     */
    constructor(container, data) {
        this.container = container;
        this.data = data;

        this.render(); 
        this.initEvents();
    }

    render() {
        const btnSVG = '<svg width="100%" height="100%" viewBox="0 0 55 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:1.5;"><g id="Artboard1" transform="matrix(0.0767193,0,0,0.0989816,-15.6412,-37.567)"><rect x="203.876" y="379.535" width="716.899" height="555.659" style="fill:none;"/><g transform="matrix(-10.3157,0,0,6.15937,-1181.59,-4146.51)"><g transform="matrix(0.363436,0,0,0.449552,-241.635,221.72)"><path d="M115.8,1275.07C128.87,1309.97 160.962,1332.92 196.694,1332.92C244.666,1332.92 283.612,1292.04 283.612,1241.7C283.612,1191.32 244.698,1150.49 196.694,1150.49C244.698,1150.49 283.612,1191.32 283.612,1241.7C283.612,1292.04 244.666,1332.92 196.694,1332.92C160.962,1332.92 128.87,1309.97 115.8,1275.07Z" style="fill:none;stroke:rgb(37,37,37);stroke-width:2.97px;"/></g><g transform="matrix(7.73711e-17,-1.64025,1.43649,1.14182e-16,-2041.72,1000.53)"><path d="M142.212,1312.38L134.492,1306.34L126.772,1312.38L134.492,1293.37L142.212,1312.38Z" style="fill:rgb(37,37,37);"/></g></g></g></svg>' 

        const carouselWrapper = document.createElement('div');
        carouselWrapper.className = 'carousel-wrapper';

        const btnSwipeLeft = document.createElement('button');
        btnSwipeLeft.className = 'swipe-left';
        btnSwipeLeft.innerHTML = `${btnSVG}`
        btnSwipeLeft.style.transform = 'rotate(180deg)'

        const btnSwipeRight = document.createElement('button');
        btnSwipeRight.className = 'swipe-right';
        btnSwipeRight.innerHTML = `${btnSVG}`

        const carouselContent = document.createElement('div');
        carouselContent.className = 'carousel-content';

        this.data.forEach(item => {
            const carouselItem = document.createElement('div'); 
            carouselItem.className = 'carousel-item';
            
            carouselItem.addEventListener('click', () => {
                if (item.mediaType === 'person') return; // on ne fait rien si c'est un acteur (car on n'a pas de page pour les acteurs)
                window.location.href = `info.html?id=${item.id}&type=${item.mediaType}`;
            });

            const img = document.createElement('img');
            img.src = item.posterUrl;
            img.alt = item.title;

            const title = createElementWithText('h2', item.title); 
            const date = createElementWithText('p', item.formattedDate); 


            // assemblage
            carouselItem.appendChild(img);
            carouselItem.appendChild(title);
            carouselItem.appendChild(date);
            carouselContent.appendChild(carouselItem);
        });

        // assemblage global
        carouselWrapper.appendChild(btnSwipeLeft);
        carouselWrapper.appendChild(carouselContent);
        carouselWrapper.appendChild(btnSwipeRight);

        this.container.appendChild(carouselWrapper);
    }

    initEvents() {
        const content = this.container.querySelector('.carousel-content');
        const firstItem = this.container.querySelector('.carousel-item');
        let scroll
        
        if (firstItem) {
            // recupere la width
            const itemWidth = firstItem.getBoundingClientRect().width;

            // recupere le gap
            const style = window.getComputedStyle(content);
            const gap = parseFloat(style.columnGap) || 0;

            // le scroll
            scroll = itemWidth + gap;
        }

        // swipe gauche
        this.container.querySelector('.swipe-left').addEventListener('click', () => {
            content.scrollLeft -= scroll
        });

        // swipe droite
        this.container.querySelector('.swipe-right').addEventListener('click', () => {
             content.scrollLeft += scroll
        });
    }
}