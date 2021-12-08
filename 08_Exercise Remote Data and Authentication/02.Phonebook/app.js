function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    list.addEventListener('click', onDelete);

    loadContacts();

}

const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');
const list = document.getElementById('phonebook');

attachEvents();

async function onDelete(event) {
    const id = event.target.dataset.id;

    if (id != undefined) {
        await deleteContact(id);
        // loadContacts();
        event.target.parentNode.remove();
    }

}

async function onCreate() {
    const person = personInput.value;
    const phone = phoneInput.value;
    const contact = { person, phone };

    const result = await createContact(contact);

    // loadContacts();
    personInput.value = '';
    phoneInput.value = '';

    list.appendChild(createItem(result));

}

async function loadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();

    list.replaceChildren(...Object.values(data).map(createItem));
    //const result = Object.values(data);
    //result.map(c => createItem(c)).forEach(i => list.appendChild(i));

}

function createItem(contact) {
    const liEl = document.createElement('li');
    liEl.innerHTML = `${contact.person}: ${contact.phone}<button data-id="${contact._id}">Delete</button>`

    return liEl;
}

async function createContact(contact) {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const option = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    };
    const res = await fetch(url, option);
    const result = await res.json();

    return result;

}

async function deleteContact(id) {
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

    const option = {
        method: 'delete'
    };
    const res = await fetch(url, option);
    const result = await res.json();

    return result;

}