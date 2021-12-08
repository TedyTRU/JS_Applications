import { search } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const searchTemplate = (album, onSearch, params = '') => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${params}>
            <button @click=${onSearch} class="button-list" name="search2">Search</button>
        </div>
    
        <h2>Results:</h2>
    
        ${album != null
        ? html` <div class="search-result">
            ${album.length == 0
            ? html`<p class="no-result">No result.</p>`
            : album.map(albumTemplate)}
        </div>`
        : null}
    
    </section>
`;

const albumTemplate = (album) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            <div class="btn-group">
    
                ${userData
        ? html`<a href="/details/${album._id}" id="details">Details</a>`
        : null}
    
            </div>
        </div>
`;

let userData = await getUserData();

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    //console.log(params);
    let album = null;

    if (params) {
        album = await search(params);
    }
    //console.log(album);

    ctx.render(searchTemplate(album, onSearch, params));

    async function onSearch() {
        const query = document.getElementById('search-input').value;
        //console.log(query);

        if (query) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(query));

        } else {
            alert('Please fill the field!');
        }

    }
}