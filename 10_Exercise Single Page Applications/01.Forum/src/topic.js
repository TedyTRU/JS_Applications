import { loadHomePage } from "./home.js";

let id;
let div;

export async function createNewTopic(event) {
    event.preventDefault();

    const form = event.target.parentNode.parentNode;
    //console.log(form);

    const formData = new FormData(form);
    const title = formData.get('topicName');
    const username = formData.get('username');
    const post = formData.get('postText');
    const time = new Date().toLocaleString();

    //console.log(title, username, post);

    if (title == '' || username == '' || post == '') {
        return alert('All fields must be filled!');
    }

    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, username, post, time })
    });

    if (res.ok == false) {
        const error = await res.json();
        return alert(error.message);

    } else {
        loadHomePage();
    }

    form.reset();

}

export async function loadTopic(postId) {
    id = postId;
    const main = document.querySelector('main');

    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + id);
    const data = await res.json();

    const fragment = document.createDocumentFragment();
    fragment.appendChild(createTitle(data.title));
    fragment.appendChild(createTitleInfo(data));

    const comments = await loadComments(id);
    comments.forEach(c => div.appendChild(c));

    fragment.appendChild(createCommentSection());

    main.innerHTML = '';
    main.appendChild(fragment);

}

function createTitle(title) {
    const el = document.createElement('div');
    el.className = 'theme-content';
    el.innerHTML = `<div class="theme-title">
    <div class="theme-name-wrapper">
        <div class="theme-name">
            <h2>${title}</h2>
        </div>
    </div>
</div>`

    return el;
}

function createTitleInfo(data) {
    div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `<div class="header">
    <img src="./static/profile.png" alt="avatar">
    <p><span>${data.username}</span> posted on <time>${data.time}</time></p>

    <p class="post-content">${data.post}</p>
</div>`

    return div;
}

function createComment(username, time, post) {
    const el = document.createElement('div');
    el.className = 'user-comment';
    el.innerHTML = `<div class="topic-name-wrapper">
    <div class="topic-name">
        <p><strong>${username}</strong> commented on <time>${time}</time></p>
        <div class="post-content">
            <p>${post}</p>
        </div>
    </div>
</div>`;

    div.appendChild(el);
    return el;
}

function createCommentSection() {
    const el = document.createElement('div');
    el.className = 'answer-comment';
    el.innerHTML = `<p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>`;

    el.querySelector('form').addEventListener('submit', onSubmit);

    return el;
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const text = formData.get('postText');
    const userName = formData.get('username');
    const time = new Date().toLocaleString();

    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, text, userName, time })
    });

    if (res.ok == false) {
        const err = await res.json();
        return alert(err.message);

    } else {
        loadTopic(id);
    }
}

async function loadComments(id) {
    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    const data = await res.json();

    const comments = Object.values(data).filter(c => c.postId == id)
        .map(c => createComment(c.userName, c.time, c.text));

    return comments;
}
