
import * as api from './api/data.js';
window.api = api;

import { logout } from './api/data.js';
import { getUserData } from './util.js';
import { page, render } from './lib.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/my-books.js';
import { searchPage } from './views/search.js';

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-books', profilePage);
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
        document.getElementById('user').style.display = 'inline-block';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;

    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';

    }
}