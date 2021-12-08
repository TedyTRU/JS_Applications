import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllArticles() {
    return api.get('/data/wiki?sortBy=_createdOn%20desc');
}

export async function getMostRecentArticles() {
    return api.get('/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getArticleById(id) {
    return api.get('/data/wiki/' + id);
}

export async function createArticle(article) {
    return api.post('/data/wiki', article);
}

export async function editArticle(id, article) {
    return api.put('/data/wiki/' + id, article);
}

export async function deleteArticle(id) {
    return api.del('/data/wiki/' + id);
}

export async function search(query) {
    return api.get(`/data/wiki?where=title%20LIKE%20%22${query}%22`);
}