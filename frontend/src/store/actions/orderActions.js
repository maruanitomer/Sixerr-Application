import { orderService } from "../../services/orderService.js";

export function loadOrders() {
    return async (dispatch) => {
        const orders = await orderService.query()
        const action = {
            type: 'SET_ORDERS',
            orders
        }
        dispatch(action)
    }
}

export function orderGig(gig, user) {
    return async (dispatch) => {
        const order = await orderService.createOrder(gig, user)
        const action = {
            type: 'ADD_ORDER',
            order
        }
        dispatch(action)
    }
}

export function updateOrder(order) {
    return async (dispatch) => {
        const savedOrder = await orderService.update(order)
        const action = {
            type: 'SAVE_ORDER',
            savedOrder
        }
        dispatch(action)
    }
}
