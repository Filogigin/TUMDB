/**
 * Composant Vue
 * Représente le carrousel principal du site défilant des médias
 * Génère le code HTML du carrousel et gère les événements de navigation
 */
export default class CarouselHero {
    /**
     * Crée et initialise un nouveau carrousel
     * @param {HTMLElement} container L'élément HTML parent dans lequel le carrousel sera injecté
     * @param {Array<Object>} data Un tableau d'entités métier (Film / TV) à afficher dans le carrousel
     */
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.currentIndex = 0

        this.render();
        this.initEvents();
    }

    render() {
        this.container.innerHTML = `
            <h1>Tendances</h1>
            
            <div class="carousel-hero">
                <button class="swipe-left" style="transform: rotate(180deg)">
                    <svg width="100%" height="100%" viewBox="0 0 55 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:1.5;"><g id="Artboard1" transform="matrix(0.0767193,0,0,0.0989816,-15.6412,-37.567)"><rect x="203.876" y="379.535" width="716.899" height="555.659" style="fill:none;"/><g transform="matrix(-10.3157,0,0,6.15937,-1181.59,-4146.51)"><g transform="matrix(0.363436,0,0,0.449552,-241.635,221.72)"><path d="M115.8,1275.07C128.87,1309.97 160.962,1332.92 196.694,1332.92C244.666,1332.92 283.612,1292.04 283.612,1241.7C283.612,1191.32 244.698,1150.49 196.694,1150.49C244.698,1150.49 283.612,1191.32 283.612,1241.7C283.612,1292.04 244.666,1332.92 196.694,1332.92C160.962,1332.92 128.87,1309.97 115.8,1275.07Z" style="fill:none;stroke-width:2.97px;"/></g><g transform="matrix(7.73711e-17,-1.64025,1.43649,1.14182e-16,-2041.72,1000.53)"><path d="M142.212,1312.38L134.492,1306.34L126.772,1312.38L134.492,1293.37L142.212,1312.38Z";"/></g></g></g></svg>
                </button>
                <div class="carousel-content" >
                    ${this.data.map(movie => `
                        <div class="carousel-item">
                            <div class="poster-3d-container">
                                <img src="${movie.posterUrl}" alt="${movie.title}">
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="swipe-right">                
                    <svg width="100%" height="100%" viewBox="0 0 55 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:1.5;"><g id="Artboard1" transform="matrix(0.0767193,0,0,0.0989816,-15.6412,-37.567)"><rect x="203.876" y="379.535" width="716.899" height="555.659" style="fill:none;"/><g transform="matrix(-10.3157,0,0,6.15937,-1181.59,-4146.51)"><g transform="matrix(0.363436,0,0,0.449552,-241.635,221.72)"><path d="M115.8,1275.07C128.87,1309.97 160.962,1332.92 196.694,1332.92C244.666,1332.92 283.612,1292.04 283.612,1241.7C283.612,1191.32 244.698,1150.49 196.694,1150.49C244.698,1150.49 283.612,1191.32 283.612,1241.7C283.612,1292.04 244.666,1332.92 196.694,1332.92C160.962,1332.92 128.87,1309.97 115.8,1275.07Z" style="fill:none;stroke-width:2.97px;"/></g><g transform="matrix(7.73711e-17,-1.64025,1.43649,1.14182e-16,-2041.72,1000.53)"><path d="M142.212,1312.38L134.492,1306.34L126.772,1312.38L134.492,1293.37L142.212,1312.38Z";"/></g></g></g></svg>
                </button>
            </div>

            <div class="description">

            </div>
        `;
        
        this.updateDescription();
        this.updateBtnStyle();
    }

    updateDescription() {
        const movie = this.data[this.currentIndex];
        const descContainer = this.container.querySelector('.description');
        
        if (movie && descContainer) {
            descContainer.innerHTML = `
                <h1>${movie.title}</h1>
                <p>${movie.overview}</p>
                <a href="info.html?id=${movie.id}&type=${movie.mediaType}" class="btn-more">En savoir plus</a>

            `;
        }
    }

    updateBtnStyle() {
        const btnRight = this.container.querySelector('.swipe-right');
        const btnLeft = this.container.querySelector('.swipe-left');
        const btnRightSvgCercle = this.container.querySelector('.swipe-right svg path');
        const btnRightSvgArrow = this.container.querySelector('.swipe-right svg g');
        const btnLeftSvgCercle = this.container.querySelector('.swipe-left svg path');
        const btnLeftSvgArrow = this.container.querySelector('.swipe-left svg g');

        // Logique pour le bouton GAUCHE
        if (this.currentIndex === 0) {
            btnLeftSvgArrow.style.fill = "var(--gray)";
            btnLeftSvgCercle.style.stroke = "var(--gray)";
            btnLeft.style.cursor = "auto"
        } else {
            btnLeftSvgArrow.style.fill = "var(--black)";
            btnLeftSvgCercle.style.stroke = "var(--black)";
            btnLeft.style.cursor = "pointer"
        }

        // Logique pour le bouton DROIT
        if (this.currentIndex === this.data.length - 1) {
            btnRightSvgArrow.style.fill = "var(--gray)";
            btnRightSvgCercle.style.stroke = "var(--gray)";
            btnRight.style.cursor = "auto"

        } else {
            btnRightSvgArrow.style.fill = "var(--black)";
            btnRightSvgCercle.style.stroke = "var(--black)";
            btnRight.style.cursor = "pointer"
        }
    }

    initEvents() {
        const content = this.container.querySelector('.carousel-content');
        let isScrolling = false; // desactiver le scroll du carousel

        let btnSwipeRight = this.container.querySelector('.swipe-right')
        let btnSwipeLeft = this.container.querySelector('.swipe-left')

        // Suivant
        btnSwipeRight.addEventListener('click', () => {
            if (
                this.currentIndex < this.data.length - 1
                && !isScrolling
            ) {
                isScrolling = true;

                this.currentIndex++;
                content.scrollLeft += content.clientWidth;
                this.updateDescription();
                this.updateBtnStyle();


                // reset du isScroling
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            }
        });

        // Précédent
        btnSwipeLeft.addEventListener('click', () => {
            if (
                this.currentIndex > 0
                && !isScrolling
            ) {
                isScrolling = true;

                this.currentIndex--;
                content.scrollLeft -= content.clientWidth;
                this.updateDescription();
                this.updateBtnStyle();

                // reset du isScroling
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            }
        });
    }
}