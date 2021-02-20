const dbJSON = require('./db.json')
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../api/user/user.service')

// const userService = {
//     async add(user) {
//         const collection = await dbService.getCollection('user')
//         await collection.insertOne(user)
//         return user
//     },
//     async update(user) {
//         const userToSave = {
//             ...user,
//             _id: ObjectId(user._id)
//         }
//         const collection = await dbService.getCollection('user')
//         await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
//         return userToSave;
//     }
// }
const gigService = {
    async add(gig) {
        const collection = await dbService.getCollection('gig')
        await collection.insertOne(gig)
        return gig
    }
}
const orderService = {
    async add(order) {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    }
}


// userMap: localId  ===> miniUserFromDB
// userMap: 'u101'  ===> {_id: 'xx12jhjkka22', fullName: 'Mashu', imgUrl: ''}

async function go() {
    const { userMap, users } = await saveUsers()
    const gigMap = await saveGigs(userMap)
    await saveOrders(userMap, gigMap)   

    users.forEach( async (user) => {
        user.myGigIds = user.myGigIds?.map(myGigId => {if (gigMap[myGigId]) return ObjectId(gigMap[myGigId]._id)})
        user.viewedGigIds = user.viewedGigIds?.map(viewedGigId => {if (gigMap[viewedGigId]) return ObjectId(gigMap[viewedGigId]._id)})
        user.favoriteIds = user.favoriteIds?.map(favoriteId => {if (gigMap[favoriteId]) return ObjectId(gigMap[favoriteId]._id)})
        await userService.update(user)
    })
}

async function saveUsers() {
    const localUserIds = []
    const prms = dbJSON.user.map((user) => {
        const localUserId = user._id
        localUserIds.push(localUserId)
        delete user._id
        return userService.add(user)
    })

    return Promise.all(prms)
        .then((users) => {
            const userMap = users.reduce((accUserMap, savedUser, idx) => {
                const miniUser = {
                    _id: savedUser._id.toString(),
                    fullname: savedUser.fullname,
                    imgUrl: savedUser.imgUrl
                }
                accUserMap[localUserIds[idx]] = miniUser
                return accUserMap
            }, {})
            return {userMap, users}
        })
}

function saveGigs(userMap) {
    const localGigIds = []
    const prms = dbJSON.gig.map(gig => {
        const localGigId = gig._id
        localGigIds.push(localGigId)
        delete gig._id
        gig.owner = userMap[gig.owner._id]
        gig.reviews = gig.reviews?.map(review => ({ ...review, by: userMap[review.by?._id] }))
        return gigService.add(gig)
    })
    return Promise.all(prms)
        .then(gigs => {
            const gigMap = gigs.reduce((accGigMap, savedGig, idx) => {
                const miniGig = {
                    sellerFullname: savedGig.owner?.fullname,
                    _id: savedGig._id.toString(),
                    title: savedGig.title,
                    imgUrl: savedGig.imgUrls[0]
                }
                accGigMap[localGigIds[idx]] = miniGig
                return accGigMap
            }, {})
            return gigMap
        })
}

function saveOrders(userMap, gigMap) {
    const prms = dbJSON.order.map(order => {
        delete order._id
        order.buyer = userMap[order.buyer._id]
        order.gig = gigMap[order.gig._id]
        return orderService.add(order)
    })
    return Promise.all(prms)
}
module.exports = {
    go
}