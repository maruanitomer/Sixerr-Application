const initialState = {
    gigs: [],
    filterBy: {}
}


export function gigReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_GIGS':
            return { ...state, gigs: action.gigs }
        case 'SAVE_GIG':
            return {
                ...state,
                gigs: state.gigs.map(gig => (gig._id === action.savedGig._id) ? action.savedGig : gig)
            }
        case 'ADD_GIG':
            return {
                ...state,
                gigs: [...state.gigs, action.savedGig]
            }
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }
        case 'REMOVE_GIG':
            return { ...state, gigs: state.gigs.filter(gig => gig._id !== action.gigId) }
        default:
            return state
    }
}
