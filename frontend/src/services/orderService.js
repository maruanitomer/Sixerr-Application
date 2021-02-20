// import { storageService } from './storageService.js';
// import { utilService } from './utilService.js';
import { httpService } from './httpService'
const BASE_URL = 'api/order' // REAL SERVER
// const BASE_URL = 'order' // JSON SERVER

export const orderService = {
    query,
    // getById,
    // cancel,
    update,
    createOrder,
}

async function query() {
    return httpService.get(BASE_URL)
}

// async function getById(gigId) {
//     return httpService.get(`gig/${gigId}`)  
// }

// async function cancel(gigId) {
//     return httpService.delete(`gig/${gigId}`)  
// }


async function createOrder(gig, user) {
    const order = _prepareOrder(gig, user)
    console.log('ordering:', order)
    return httpService.post(BASE_URL, order) 
}

async function update(order) {
    console.log('updating order:', order)
    return httpService.put(`${BASE_URL}/${order._id}`, order) 
}


function _prepareOrder(gig, user) {
    return {
        createdAt: Date.now(),
        buyer: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl
        },
        totalPrice: gig.packages[0].price,
        currency: 'USD',
        gig: {
            sellerFullname: gig.owner.fullname,
            _id: gig._id,
            title: gig.title,
            imgUrl: gig.imgUrls[0]
        },
        status: 'pending'
    }
}
