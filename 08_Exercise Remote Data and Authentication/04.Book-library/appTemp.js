
// load all books
// create book
// delete book
// update book


// handle  create form
// handle edit form

// load book for editting
// handle delete button

// initialization

const tbody = document.querySelector('tbody');
const createForm = document.getElementById('createForm');
const editForm = document.getElementById('editForm');

document.getElementById('loadBooks').addEventListener('click', loadBooks);

createForm.addEventListener('submit', onCreate);
editForm.addEventListener('submit', onEditSubmit);
tbody.addEventListener('click', onTableClick);

loadBooks();

async function onEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await updateBook(id, { author, title });
    event.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';

    loadBooks();
}

function onTableClick(event) {
    if (event.target.className == 'delete') {
        onDelete(event.target)
    } else if (event.target.className == 'edit') {
        onEdit(event.target);
    }

}

async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;

    //return book;
    // console.log(book);
}

async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const author = formData.get('author');
    const title = formData.get('title');

    const result = await createBook({ author, title });
    tbody.appendChild(createRow(result._id, result));
    event.target.reset();
    //console.log(result);
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${id}>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>`;

    return row;
}

async function loadBooks() {
    const url = `http://localhost:3030/jsonstore/collections/books`;
    const books = await request(url);

    //Object.entries(books).map(([id, book]) => createRow(id, book)).forEach(b => tbody.appendChild(b))
    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);

    //console.log(result);
}

async function loadBookById(id) {
    const url = `http://localhost:3030/jsonstore/collections/books/` + id;
    const book = await request(url);

    return book;
}

async function createBook(book) {
    const url = `http://localhost:3030/jsonstore/collections/books`;
    const options = {
        method: 'post',
        body: JSON.stringify(book)
    };

    return await request(url, options);
}

async function updateBook(id, book) {
    const url = `http://localhost:3030/jsonstore/collections/books/` + id;
    const options = {
        method: 'put',
        body: JSON.stringify(book)
    };

    return await request(url, options);
}

async function deleteBook(id) {
    const url = `http://localhost:3030/jsonstore/collections/books/` + id;
    const options = {
        method: 'delete',
    };

    return await request(url, options);
}

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            },
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