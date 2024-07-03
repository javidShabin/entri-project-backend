const express = require('express')
const { userRouter } = require('./userRouter')
const { restaurantRouter } = require('./restautantRouter')
const { menuRouter } = require('./menuRouter')
const { cartRouter } = require('./cartRouter')
const { reviewRatingRouter } = require('./reviewRatingRouter')
const { addressRouter } = require('./addressRouter')
const router = express.Router()

router.use('/user', userRouter)
router.use('/restaurant', restaurantRouter)
router.use("/menu", menuRouter)
router.use("/cart", cartRouter)
router.use("/reivew", reviewRatingRouter)
router.use("/address", addressRouter)

module.exports = {v1Router: router}