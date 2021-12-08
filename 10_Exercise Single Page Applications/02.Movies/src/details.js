
// initialization
// - find relevant section
// - detach section from DOM

import { e, showView } from './dom.js';
import { showEdit } from './edit.js';
import { showHome } from './home.js';

const section = document.getElementById('movie-details');
section.remove();

// display logic

export function showDetails(movieId) {
    //console.log(movieId);
    showView(section);
    getMovie(movieId);
}

async function getMovie(id) {
    section.replaceChildren(e('p', {}, 'Loading...'));

    const request = [
        fetch('http://localhost:3030/data/movies/' + id),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
    ];

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        request.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`));
    }

    const [movieRes, likesRes, hasLikedRes] = await Promise.all(request);
    const [movieData, likes, hasLiked] = await Promise.all([
        movieRes.json(),
        likesRes.json(),
        hasLikedRes && hasLikedRes.json()
    ]);

    //const res = await fetch('http://localhost:3030/data/movies/' + id);
    //const data = await res.json();

    section.replaceChildren(createDetails(movieData, likes, hasLiked));
    // section.replaceChildren(createDetails(data));
    //return data;
}

function createDetails(movie, likes, hasLiked) {
    console.log(hasLiked);
    const controls = e('div', { className: 'col-md-4 text-center' },
        e('h3', { className: 'my-3' }, 'Movie Description'),
        e('p', {}, movie.description)
    );

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    //debugger;
    if (userData != null) {
        if (userData.id == movie._ownerId) {
            controls.appendChild(e('a', { className: 'btn btn-danger', href: '#', onClick: (e) => onDelete(e, movie._id) }, 'Delete'));
            controls.appendChild(e('a', { className: 'btn btn-warning', href: '#', onClick: () => showEdit(movie._id)  }, 'Edit'));

        } else {

            if (hasLiked.length > 0) {
                controls.appendChild(e('a', { className: 'btn btn-primary', href: '#', onClick: onUnlike }, 'Unlike'));
            } else {
                controls.appendChild(e('a', { className: 'btn btn-primary', href: '#', onClick: onLike }, 'Like'));
            }
        }
    }
    controls.appendChild(e('span', { className: 'enrolled-span' }, `Liked ${likes}`));

    const element = e('div', { className: 'container' },
        e('div', { className: 'row bg-light text-dark' },
            e('h1', {}, `Movie title: ${movie.title}`),
            e('div', { className: 'col-md-8' },
                e('img', { className: 'img-thumbnail', src: movie.img, alt: 'Movie' })
            ),
            controls
        )
    );
    return element;

    async function onLike() {
        //console.log('liked');

        await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({
                movieId: movie._id
            })
        });

        showDetails(movie._id);
    }

    async function onUnlike() {
        const likeId = hasLiked[0]._id;

        await fetch('http://localhost:3030/data/likes/' + likeId, {
            method: 'delete',
            headers: {
                'X-Authorization': userData.token
            }
        });

        showDetails(movie._id);
    }

}

// window.getMovie = getMovie;

async function onDelete(e, id) {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this movie ?');
    if (confirmed) {
        const response = await fetch('http://localhost:3030/data/movies/' + id, {
            method: 'delete',
            headers: { 'X-Authorization': JSON.parse(sessionStorage.getItem('userData')).token }
        });

        if (response.ok) {
            alert('Movie deleted');
            showHome();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    }
}