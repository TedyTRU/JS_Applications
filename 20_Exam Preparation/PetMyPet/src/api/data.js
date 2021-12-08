import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;


export async function getAllPets() {
    return api.get('/data/pets?sortBy=_createdOn%20desc');
}

export async function getPetById(id) {
    return api.get('/data/pets/' + id);
}

export async function getMyPets(userId) {
    return api.get(`/data/pets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createPet(car) {
    return api.post('/data/pets', car);
}

export async function editPet(id, car) {
    return api.put('/data/pets/' + id, car);
}

export async function deletePet(id) {
    return api.del('/data/pets/' + id);
}

export async function likePet(petId){
    return api.post('/data/likes', { petId });
}

export async function getLikesByPetId(petId) {
    return api.get(`/data/likes?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeByPetId(petId, userId) {
    return api.get(`/data/likes?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}