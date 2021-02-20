let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)
const initialState = {
    user: localLoggedinUser
}


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user }
        case 'SET_NO_USER':
            return { ...state, user: null }
        default:
            return state
    }
}
