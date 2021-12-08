
import { showCatalogPage } from './catalog.js';
import { showAboutPage, showHomePage } from './home.js'

document.querySelector('nav').addEventListener('click', onNavigate);

const sections = {
    'homeBtn': showHomePage,
    'catalogBtn': showCatalogPage,
    'aboutBtn': showAboutPage
};

// start application in home view
showHomePage();

function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const view = sections[event.target.id];

        if (typeof view == 'function') {
            event.preventDefault();
            view();
        }
    }
}

