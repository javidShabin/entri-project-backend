const express = require('express')
const { userRouter } = require('./userRouter')
const { restaurantRouter } = require('./restautantRouter')
const router = express.Router()

router.use('/user', userRouter)
router.use('/restaurant', restaurantRouter)

module.exports = {v1Router: router}