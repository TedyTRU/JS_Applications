async function solution() {

    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    const res = await fetch(url);
    const data = await res.json();

    const main = document.getElementById('main');

    // console.log(data);
    // data.forEach(a => console.log(a._id, a.title));

    // const { content } = await getArticle('ee9823ab-c3e8-4a14-b998-8c22ec246bd3')
    // console.log(content);

    data.forEach(a => main.appendChild(createArticle(a._id, a.title)))

}

function createArticle(id, title) {

    const extra = e('div', { className: 'extra' }, e('p', {}, ''));
    const btn = e('button', { className: 'button', id: id }, 'More');
    const article = e('div', { cassName: 'accordion' },
        e('div', { className: 'head' }, e('span', {}, title), btn), extra);


    btn.addEventListener('click', async () => {

        if (btn.textContent == 'More') {
            btn.textContent = 'Less';

            const { content } = await getArticle(id);
            extra.textContent = content;
            extra.style.display = 'block';

        } else {
            btn.textContent = 'More';
            extra.style.display = 'none';

        }
    })

    return article;
}

async function getArticle(id) {
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/` + id;
    const res = await fetch(url);
    const data = await res.json();

    return data;

}

function e(type, attr, ...content) {
    const element = document.createElement(type);

    for (let prop in attr) {
        element[prop] = attr[prop];
    }

    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }

    return element;
}

document.addEventListener('DOMContentLoaded', solution)