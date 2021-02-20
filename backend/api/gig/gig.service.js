const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('gig')
        // TODO ADD FILTER
        // const collection = await dbService.getCollection('gig')
        // var gigs = await collection.find(criteria).toArray()
        var gigs = await collection.find(criteria).toArray()
        // gigs = gigs.map(gig => {
        //     return gig
        // })
        return gigs
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        const gig = await collection.findOne({ '_id': ObjectId(gigId) })
        // gig.Reviews = await reviewService.query({ byGigId: ObjectId(gig._id) }) // TODO CREATE THE CONNECTION IN THE DB
        return gig
    } catch (err) {
        logger.error(`while finding gig ${gigId}`, err)
        throw err
    }
}

async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.deleteOne({ '_id': ObjectId(gigId) })
    } catch (err) {
        logger.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}

async function update(gig) {
    try {
        // TODO ? peek only updatable fields!
        const gigToSave = {
            ...gig,
            _id: ObjectId(gig._id),
        }
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ '_id': gigToSave._id }, { $set: gigToSave })
        return gigToSave;
    } catch (err) {
        logger.error(`cannot update gig ${gig._id}`, err)
        throw err
    }
}

async function add(gig) {
    try {
        // TODO ? peek only updatable fields!
        const gigToAdd = {
            ...gig
        }
        const collection = await dbService.getCollection('gig')
        await collection.insertOne(gigToAdd)
        return gigToAdd
    } catch (err) {
        logger.error('cannot insert gig', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    const txtCriteria = { $regex: filterBy.text, $options: 'i' }
    // const tagCriterias = filterBy.tags.map(tag => ({ $regex: tag, $options: 'i' }))
    if (filterBy.owner || filterBy.gigList.length) {
        criteria.$or = [
            {
                ['owner._id']: filterBy.owner
            },
            ...filterBy.gigList.map(id => ({ _id: ObjectId(id) }))
        ]
    } else if (filterBy.tags.length) criteria.$or = filterBy.tags.map(tag => ( { tags:tag } ) )
    else {
        criteria.$or = [
            {
                title: txtCriteria
            },
            {
                desc: txtCriteria
            },
        ]
    }
    // if (filterBy.type !== 'all') {
    //     criteria.type = filterBy.type
    // }
    // if (filterBy.inStock) {
    //     criteria.inStock = inStock
    // }
    // if (filterBy.price) {
    //     criteria.price = { $gte: filterBy.price }
    // }
    return criteria
}

