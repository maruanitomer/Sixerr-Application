import { cloudinaryService } from "../../services/cloudinaryService.js";
import { userService } from "../../services/userService.js";


export function login(userCreds) {
    return async (dispatch) => {
        const user = await userService.login(userCreds)
        const action = {
            type: 'SET_USER',
            user
        }
        dispatch(action)

    }
}

export function logout() {
    return async (dispatch) => {
        await userService.logout()
        const action = {
            type: 'SET_NO_USER'
        }
        dispatch(action)
    }
}

export function addUser(userToAdd) {
    // Add default empty fields
    userToAdd.imgUrl = '/img/img1.jpg'
    userToAdd.isAdmin = false
    return async (dispatch) => {
        const user = await userService.signup(userToAdd)
        const action = {
            type: 'SET_USER',
            user
        }
        dispatch(action)
    }
}
export function onImageChange(ev) {
    return async (dispatch, getState) => {
        const data = await cloudinaryService.uploadImg(ev)
        const userToSave = { ...getState().userModule.user }
        userToSave.imgUrl = data.secure_url
        const user = await userService.update(userToSave)
        const action = {
            type: 'SET_USER',
            user
        }
        dispatch(action)
    }
}

export function updateUser(userToSave) {
    return async (dispatch) => {
        const user = await userService.update(userToSave)
        const action = {
            type: 'SET_USER',
            user
        }
        dispatch(action)
    }
}

