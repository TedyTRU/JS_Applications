
/* debug
// import * as api from './api/api.js';
// window.api = api;

*/
import * as api from './api/data.js';
window.api = api;


const root = document.querySelector('main');

import { page, render } from './lib.js';
import { homePage } from './views/home.js';


page(decorateContext);
page('/', homePage);
//page('/memes', catalogPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);


    next();
}