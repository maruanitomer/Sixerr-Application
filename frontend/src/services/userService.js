// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'
const BASE_URL = 'api/user' // REAL SERVER
// const BASE_URL = 'user' // JSON SERVER


export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
}

window.userService = userService
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})

function getUsers() {
    // return storageService.query('user')
    return httpService.get(BASE_URL)
}

function getById(userId) {
    // return storageService.get('user', userId)
    return httpService.get(`${BASE_URL}/${userId}`)
}
function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`${BASE_URL}/${userId}`)
}

async function update(user) {
    // return storageService.put('user', user)
    user = await httpService.put(`${BASE_URL}/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user
}

async function login(userCred) {
    //JSON SERVER
    // const users = await httpService.get('user')
    // const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
    // if (user) {
    //     console.log('Found user')
    //     return _saveLocalUser(user)
    // }
    // else throw new Error('no user')
    // REAL SERVER
    const user = await httpService.post('api/auth/login', userCred)
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    // const user = await httpService.post('user', userCred) //JSON SERVER
    const user = await httpService.post('api/auth/signup', userCred) // REAL SERVER
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.clear()
    // return //JSON SERVER
    return await httpService.post('api/auth/logout') // REAL SERVER
}
function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

