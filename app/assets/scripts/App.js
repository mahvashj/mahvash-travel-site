import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
//import Modal from './modules/Modal'

//new Modal()
//let stickyHeader = 
new StickyHeader()
// selecting the items for 'reveal on scroll' for 'feature's and 'testimonial's
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75) //threshold item: 75
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60) //threshold item: 60
// let revealOnScroll = new RevealOnScroll()
//let mobileMenu = 
new MobileMenu();
let modal 

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => { 
        e.preventDefault()
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */ './modules/Modal').then(x => {
                modal = new x.default()
                setTimeout(() => modal.openTheModal(), 20) /* browser waiting 20ms  */
            }).catch(() => console.log("There was a problem."))
        } else {
            modal.openTheModal()
        }
    })
})

if (module.hot) {
    module.hot.accept()
}



