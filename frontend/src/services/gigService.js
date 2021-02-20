// import { storageService } from './storageService.js';
// import { utilService } from './utilService.js';
import { httpService } from './httpService'
const BASE_URL = 'api/gig' // REAL SERVER
// const BASE_URL = 'gig' // JSON SERVER
export const gigService = {
    query,
    deleteGig,
    save,
    getById
}

function query(filterBy) {
    const queryString = Object.keys(filterBy).map(key => `${key}=${filterBy[key]}`).join('&');
    // return httpService.get(`${BASE_URL}/?${queryString}`)
    return httpService.get(BASE_URL, filterBy)
}

async function getById(gigId) {
    return httpService.get(`${BASE_URL}/${gigId}`)
}

async function deleteGig(gigId) {
    return httpService.delete(`${BASE_URL}/${gigId}`)
}

async function save(gigToSave) {
    if (gigToSave._id) {
        return httpService.put(`${BASE_URL}/${gigToSave._id}`, gigToSave) // UPDATE
    } else {
        return httpService.post(BASE_URL, gigToSave) // CREATE
    }
}
