import { html } from '../lib.js';
import { searchBooks } from '../api/data.js';


const searchTemplate = (books, onSearch, params = '') => html`
        <section id="search-page" class="dashboard">
            <h1>Search</h1>

            <form @submit=${onSearch}>
                <input type="text" name="search" .value=${params}>
                <input type="submit" value="Search">
            </form>


            ${books.length == 0 
            ? html `<p class="no-books">No results found!</p>`
            : html`<ul class="other-books-list">
                  ${books.map(bookCard)}
                </ul>`}
        </section>`;

const bookCard = (book) => html`
        <li class="otherBooks">
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <a class="button" href="/details/${book._id}">Details</a>
        </li>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let books = [];

    if (params) {
        books = await searchBooks(decodeURIComponent(params));
    }
    
    ctx.render(searchTemplate(books, onSearch, params));

    function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const search = formData.get('search').trim();
        //console.log(search);
        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }

    }
}