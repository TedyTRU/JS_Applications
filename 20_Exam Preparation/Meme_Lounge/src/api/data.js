import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllMemes() {
    return api.get('/data/memes?sortBy=_createdOn%20desc');
}