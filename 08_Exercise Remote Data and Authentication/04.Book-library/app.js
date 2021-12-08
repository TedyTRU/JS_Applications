

document.getElementById('loadBooks').addEventListener('click', loadBooks);

const list = document.querySelector('tbody');
const editForm = document.getElementById('editForm');
const crateForm = document.getElementById('createForm');

createForm.addEventListener('submit', onCreate);
editForm.addEventListener('submit', onEditSubmit);
list.addEventListener('click', onTableClick);

loadBooks();

async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();

}

async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="title"]').value = book.title;
    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="id"]').value = id;

}

async function onTableClick(event) {
    if (event.target.className == 'edit') {
        onEdit(event.target);
    } else if (event.target.className == 'delete') {
        onDelete(event.target);
    }

}

async function onEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const book = await updateBook(id, { author, title });
    event.target.reset();

    createForm.style.display = 'block';
    editForm.style.display = 'none';

    loadBooks();
}

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const author = formData.get('author');
    const title = formData.get('title');

    const book = await createBook({ author, title });
    list.appendChild(createRow(book._id, book));
    event.target.reset();
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.author}</td>
    <td>${book.title}</td>
    <td data-id="${id}">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>`;

    return row;
}

async function deleteBook(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const options = {
        method: 'delete'
    };

    return await request(url, options);
}

async function updateBook(id, book) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const options = {
        method: 'put',
        body: JSON.stringify(book)
    };

    return await request(url, options);
}

async function createBook(book) {
    const url = 'http://localhost:3030/jsonstore/collections/books/';
    const options = {
        method: 'post',
        body: JSON.stringify(book)
    };

    return await request(url, options);
}

async function loadBookById(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const book = await request(url);

    return book;

}

async function loadBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const books = await request(url);

    const row = Object.entries(books).map(([id, book]) => createRow(id, book));
    list.replaceChildren(...row);
}

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const response = await fetch(url, options);

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}