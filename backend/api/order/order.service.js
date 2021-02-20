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
        const collection = await dbService.getCollection('order')
        // TODO ADD FILTER
        // const collection = await dbService.getCollection('order')
        // var orders = await collection.find(criteria).toArray()
        var orders = await collection.find(criteria).toArray()
        // orders = orders.map(order => {
        //     return order
        // })
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ '_id': ObjectId(orderId) })
        // order.Reviews = await reviewService.query({ byOrderId: ObjectId(order._id) }) // TODO CREATE THE CONNECTION IN THE DB
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ '_id': ObjectId(orderId) })
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function update(order) {
    try {
        // TODO ? peek only updatable fields!
        const orderToSave = {
            ...order,
            _id: ObjectId(order._id),
        }
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ '_id': orderToSave._id }, { $set: orderToSave })
        return orderToSave;
    } catch (err) {
        logger.error(`cannot update order ${order._id}`, err)
        throw err
    }
}

async function add(order) {
    try {
        // TODO ? peek only updatable fields!
        const orderToAdd = {
            ...order
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        criteria.name = { $regex: filterBy.name, $options: 'i' }
    }
    if (filterBy.type !== 'all') {
        criteria.type = filterBy.type
    }
    if (filterBy.inStock) {
        criteria.inStock = inStock
    }
    if (filterBy.price) {
        criteria.price = { $gte: filterBy.price }
    }
    return criteria
}

