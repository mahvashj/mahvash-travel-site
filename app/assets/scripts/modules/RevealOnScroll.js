import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'


class RevealOnScroll {
    constructor(els, thresholdPercent) {
        // 'els' short for elements
        this.thresholdPercent = thresholdPercent
        this.itemsToReveal = els
        // this.itemsToReveal = document.querySelectorAll(".feature-item")
        this.browserHeight = window.innerHeight 
        //..querySelector only selects the first element that matches the '.featuer-item'
        // NOTE: ..querySelectorAll selects multiple elements 
        this.hideInitially()
        //200ms -- for every 1 second the user is scrolling the page, 
        //the function is being called 5 times at most. 
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()

    }

    events() {
       window.addEventListener("scroll", this.scrollThrottle)
       window.addEventListener('resize', debounce(() => {
           console.log('Resize just ran')
           this.browserHeight = window.innerHeight
       }, 333))
    }
       /*
       window.addEventListener("scroll", () => {
           this.itemsToReveal.forEach( el => {
               this.calculateIfScrolledTo(el)
           })
       }) */
    

    //calcCaller method checks if the element has been scrolled on yet.
    calcCaller() {
        console.log("Scroll function ran")
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el)
            }
        })  /* this.calculateIfScrolledTo(el) >> commented the code as it was changed. */
        
    }

    calculateIfScrolledTo(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            console.log("Element was calculated")
            /* getting bounding rectangle number divided by the height of the browser window */ 
            let scrollPercent = ( el.getBoundingClientRect().y / this.browserHeight) * 100
            if (scrollPercent < this.thresholdPercent ) {
                //replacing the hardcoded 75 to 'this.thresholdPercent'
                //if (scrollPercent < this.thresholdPercent ) 
                el.classList.add('reveal-item--is-visible')
                el.isRevealed = true
                if (el.isLastItem) {
                    window.removeEventListener('scroll', this.scrollThrottle)
                }
            }
            /* console.log(el.getBoundingClientRect().y) */
        }
    }

    // Method to hide the elements initially:
    // 'el' stands for element, nothing fancy about it ;)
    /* traditional original function before changing to arrow function for the code to be cleaner: 
    hideInitially() { 
        this.itemsToReveal.forEach(function(el) {
            el.classList.add("reveal-item")
        }) 
    */

    /* We want the method to run as soon as the page loads, therefore adding the method 
       within the constructor function. */     
   /* hideInitially() { 
        this.itemsToReveal.forEach(el => el.classList.add("reveal-item"))
    } */

    hideInitially() { 
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item")
            el.isRevealed = false
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
    }
}

export default RevealOnScroll;