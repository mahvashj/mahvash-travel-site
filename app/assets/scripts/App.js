import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'

// selecting the items for 'reveal on scroll' for 'feature's and 'testimonial's
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75) //threshold item: 75
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60) //threshold item: 60

// let revealOnScroll = new RevealOnScroll()


let mobileMenu = new MobileMenu();

if (module.hot) {
    module.hot.accept()
}



