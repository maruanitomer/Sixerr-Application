const initialState = {
    orders: []
}


export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.orders }
        case 'SAVE_ORDER':
            return {
                ...state,
                orders: state.orders.map(order => (order._id === action.savedOrder._id) ? action.savedOrder : order)
            }
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.order]
            }
        // case 'FILTER_GIGS':
        //     return { ...state, filterBy: action.filterBy }
        // case 'REMOVE_GIG':
        //     return { ...state, gigs: state.gigs.filter(gig => gig._id !== action.gigId) }
        default:
            return state
    }
}
