import * as api from './api/data.js';
window.api = api;


import { logout } from './api/data.js';
import { getUserData } from './util.js';
import { page, render } from './lib.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/my-listings.js';
import { searchPage } from './views/search.js';


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-listings', profilePage);
page('/search', searchPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.querySelector('#profile a').textContent = `Welcome, ${userData.username}`;

    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('profile').style.display = 'none';

    }
}