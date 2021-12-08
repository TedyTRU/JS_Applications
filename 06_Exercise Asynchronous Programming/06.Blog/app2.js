function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost() {
    // get selected value from list
    // load post
    // load comments for post
    // render data

    const selectedId = document.getElementById('posts').value;

    //console.log(selectedId);
    const post = await getPostById(selectedId);
    const comments = await getCommentsByPostId(selectedId);
    //console.log(post);
    //console.log(comments);

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.body;

    const ulEl = document.getElementById('post-comments');
    ulEl.replaceChildren();

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