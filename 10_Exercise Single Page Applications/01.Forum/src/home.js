import { loadTopic } from "./topic.js";


export async function loadHomePage() {

    const main = document.querySelector('main');
    const divNewTopic = document.querySelector('.new-topic-border');

    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const data = await res.json();
    //console.log(Object.values(data));

    main.innerHTML = '';

    const fragment = document.createDocumentFragment();
    Object.values(data).map(createElementInHomeView).forEach(d => fragment.appendChild(d));

    main.appendChild(divNewTopic);
    main.appendChild(fragment);
}

function createElementInHomeView(post) {
    const topic = document.createElement('div');
    topic.className = 'topic-container';
    topic.innerHTML = `<div class="topic-name-wrapper">
    <div class="topic-name">
        <a href="#" class="normal">
            <h2 id="${post._id}">${post.title}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${post.time}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${post.username}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>`;

    topic.addEventListener('click', (event) => {
        if (event.target.tagName == 'H2') {
            const id = event.target.id;
            //console.log(id);
            loadTopic(id);
        }
    });

    return topic;

}