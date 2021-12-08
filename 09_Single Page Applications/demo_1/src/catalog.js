
import { showSection, e } from "./dom.js";

const section = document.getElementById('catalogSection');
const ul = section.querySelector('ul')
section.remove();

export function showCatalogPage() {
    showSection(section);

    loadMovies();
}

async function loadMovies() {
    ul.replaceChildren(e('p', {}, 'Loading...'));

    const res = await fetch('http://localhost:3030/data/movies');
    const movies = await res.json();

    ul.replaceChildren(...movies.map(createMovieCard));
}

function createMovieCard(movie) {
    return e('li', {}, movie.title);
}