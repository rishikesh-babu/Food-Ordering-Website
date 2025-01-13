const express = require('express')
const { adminAuth } = require('../middlewares/adminAuth')
const { createHotel, getAllHotel, createFood, singleHotel, singleFood, getAllFood } = require('../controllers/hotelController')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: hotel')

    next()
})

router.post('/create-hotel', adminAuth, upload.single('image'), createHotel)
router.post('/3.', adminAuth, upload.single('image'), createFood)

router.put('/update-hotel/:hotelId')
router.put('/update-food/:foodId')

router.delete('/delete-hotel/:hotelId')
router.delete('/delete-food/:foodId')

router.get('/get-all-hotels', getAllHotel)
router.get('/get-all-food', getAllFood)
router.get('/single-hotel/:hotelId', singleHotel)
router.get('/single-food/:foodId', singleFood)

const hotelRouter = router
module.exports = { hotelRouter }