import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'


class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header")
        this.pageSections = document.querySelectorAll(".page-section")
        this.browserHeight = window.innerHeight
        this.previousScrollY = window.scrollY
        this.events()
    }

    events() {
        window.addEventListener('scroll', throttle(() => this.runOnScroll(), 200) )
        window.addEventListener('resize', debounce(() => {
            // console.log('Resize just ran') -- not needed for testing here! 
            this.browserHeight = window.innerHeight
        }, 333))
    }

    runOnScroll() {
        this.determineScrollDirection()



        if (window.scrollY > 60) { /* if user scrolls down more than 60 pixels
                                    the header becomes a darker shade of blue. */
            this.siteHeader.classList.add("site-header--dark")
        } 
        /* else is for when/if user has done the opposite of above, 
           removing the dark modifier class. */
        else {
            this.siteHeader.classList.remove("site-header--dark")
        }

        this.pageSections.forEach(el => this.calcSection(el))
        /* calcSection: this method calculates if the current page section has been scrolled to. 
            When calling this method we are passing to it the current element, 'el'.*/
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down'
        } else {
            this.scrollDirection = 'up'
        }
        this.previousScrollY = window.scrollY

    }

    calcSection(el) {
        /* Only if the user has scrolled down far enough to far enough where the section has entered the 
           view part and have not scrolled down so far that the bottom edge section of the port is not at 
           browser's view port at all. In other words if the section is not at viewer's browser port at all,
           we are not going to worry about anyother calculation. */  

        /* replaced window.innerHeight with this.browserHeight */
        if (window.scrollY + this.browserHeight > el.offsetTop && 
            window.scrollY < el.offsetTop + el.offsetHeight) {
                let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100

                if (scrollPercent < 18 && scrollPercent > -0.1) {
                    let matchingLink = el.getAttribute("data-matching-link")
                    document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
                    document.querySelector(matchingLink).classList.add("is-current-link")
                }
        }
    }
}

export default StickyHeader;