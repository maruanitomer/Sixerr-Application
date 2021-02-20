const orderService = require('./order.service')
const logger = require('../../services/logger.service')

async function getOrder(req, res) {
    try {
        const order = await orderService.getById(req.params.id)
        res.send(order)
    } catch (err) {
        logger.error('Failed to get order', err)
        res.status(500).send({ err: 'Failed to get order' })
    }
}

async function getOrders(req, res) {
    const { text, type, inStock, price } = req.query
    const filterBy = {
        name: text || '',
        type: type || 'all',
        inStock: inStock === 'true',
        price: +price || 0
    }
    try {
        const orders = await orderService.query(filterBy)
        res.send(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}

async function updateOrder(req, res) {
    try {
        const order = req.body
        const savedOrder = await orderService.update(order)
        res.send(savedOrder)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}

async function addOrder(req, res) {
    try {
        var order = req.body
        // order.byUserId = req.session.user._id
        order = await orderService.add(order)
        res.send(order)

    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}


module.exports = {
    getOrder,
    getOrders,
    deleteOrder,
    updateOrder,
    addOrder
}