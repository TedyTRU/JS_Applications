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
import { searchPage } from './views/search.js';


const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
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
        document.getElementById('catalogBtn').style.display = 'inline';
        document.getElementById('searchBtn').style.display = 'inline';
        document.getElementById('logoutBtn').style.display = 'inline';
        document.getElementById('createBtn').style.display = 'inline';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';

    } else {
        document.getElementById('catalogBtn').style.display = 'inline';
        document.getElementById('searchBtn').style.display = 'inline';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('createBtn').style.display = 'none';
        document.getElementById('loginBtn').style.display = 'inline';
        document.getElementById('registerBtn').style.display = 'inline';
    }
}

