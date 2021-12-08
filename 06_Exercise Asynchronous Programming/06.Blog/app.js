function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost() {

    const titleEl = document.getElementById('post-title');
    const bodyEl = document.getElementById('post-body');
    const ulEl = document.getElementById('post-comments');

    titleEl.textContent = 'Loading...';
    bodyEl.textContent = '';
    ulEl.replaceChildren();

    const selectedId = document.getElementById('posts').value;

    const [post, comments] = await Promise.all([
        getPostById(selectedId),
        getCommentsByPostId(selectedId)
    ]);

    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;

    comments.forEach(c => {
        const liEl = document.createElement('li');
        liEl.textContent = c.text;
        ulEl.appendChild(liEl);
    });

}

async function getAllPosts() {
    const url = `http://localhost:3030/jsonstore/blog/posts`;

    const res = await fetch(url);
    const data = await res.json();

    const selectEl = document.getElementById('posts');
    selectEl.replaceChildren();

    Object.values(data).forEach(p => {
        const optionEl = document.createElement('option');
        optionEl.textContent = p.title;
        optionEl.value = p.id;

        selectEl.appendChild(optionEl);
    });

}

async function getPostById(postId) {
    const url = `http://localhost:3030/jsonstore/blog/posts/` + postId;

    const res = await fetch(url);
    const data = await res.json();

    return data;

}

async function getCommentsByPostId(postId) {
    const url = `http://localhost:3030/jsonstore/blog/comments`;

    const res = await fetch(url);
    const data = await res.json();

    const comments = Object.values(data).filter(c => c.postId == postId);

    return comments;

}