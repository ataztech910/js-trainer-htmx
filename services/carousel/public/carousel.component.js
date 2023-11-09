// Comment this line for dev
// import './carousel.styles.css';

class CarouselComponent extends HTMLElement {
    currentScrollPage = 0;
    slider = document.querySelector('.carousel-component');
    constructor() {
        super();
        this.initDraggable();
        // This is a simple scroll navigation based on hardcoded values
        // For the real component please calculate the current width 
        // and split it into chunks
        this.getAttribute("viewType") === 'flex' && this.addNavigation();
    }

    addNavigation() {
        this.createButton('left');
        this.createButton('right');
    }
    /**
     * This function is created to generate arrow button
     * it takes direction as string and render the button with  scroll change logic
     * As mentioned before, please make calculations first. Here we will hardcode the values
     * 
     * @param { string } direction 
     * @returns void
     */
    createButton(direction) {
        window[direction] = document.createElement( "span" );
        window[direction].classList.add('arrow');
        window[direction].classList.add(`arrow--${direction}`);
        window[direction].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="15">
                                            <path id="arrow-${direction}" d="M5.764 15 .056 7.501 5.764 0l1.68 1.279-4.736 6.222 4.736 6.22z"></path>
                                        </svg>`;
        this.slider.parentNode.appendChild(window[direction]);
        window[direction].addEventListener('click', () => {
            if (this.currentScrollPage < 1100 * 3 &&  direction === 'right') {
                this.currentScrollPage = this.currentScrollPage + 1100;
                this.slider.scroll({
                    left: this.currentScrollPage,
                    behavior: "smooth",
                });
            } else if(this.currentScrollPage > 1 &&  direction === 'left') {
                this.currentScrollPage = this.currentScrollPage - 1200;
                this.slider.scroll({
                    left: this.currentScrollPage,
                    behavior: "smooth",
                });
            }
        });
    }

    /**
     * This function will create logic for the draggable scroll view
     * To see it please use 'flex' as view parameter in url
     * 
     * @returns void
     */
    initDraggable() {
        let isDown = false;
        let startX;
        let scrollLeft;

        if (!this.slider) {
            return false;
        }
        
        this.slider.addEventListener('mousedown', (e) => {
            isDown = true;
            this.slider.classList.add('active');
            startX = e.pageX - this.slider.offsetLeft;
            scrollLeft = this.slider.scrollLeft;
        });
        this.slider.addEventListener('mouseleave', () => {
            isDown = false;
            this.slider.classList.remove('active');
        });
        this.slider.addEventListener('mouseup', () => {
            isDown = false;
            this.slider.classList.remove('active');
        });
        this.slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - this.slider.offsetLeft;
            const walk = (x - startX) * 3;
            this.slider.scrollLeft = scrollLeft - walk;
        });
    }
};
customElements.define('carousel-component', CarouselComponent);
