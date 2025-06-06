const express = require('express')
const { adminAuth } = require('../middlewares/adminAuth')
const { createHotel, getAllHotel, createFood, singleHotel, singleFood, getAllFood, deleteHotel, deleteFood, getAllFoodAdmin, updateHotel, singleHotelFood, updateFood } = require('../controllers/hotelController')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: hotel')

    next()
})

router.post('/create-hotel', adminAuth, upload.single('image'), createHotel)
router.post('/create-food', adminAuth, upload.single('image'), createFood)

router.put('/update-hotel', adminAuth, upload.single('image'), updateHotel)
router.put('/update-food', adminAuth, upload.single('image'), updateFood)

router.delete('/delete-hotel/:hotelId', adminAuth, deleteHotel)
router.delete('/delete-food/:foodId', adminAuth, deleteFood)

router.get('/get-all-hotels', getAllHotel)
router.get('/get-all-food', getAllFood)
router.get('/get-all-food-admin', adminAuth, getAllFoodAdmin)
router.get('/single-hotel/:hotelId', singleHotel)
router.get('/single-hotel-food/:hotelId', singleHotelFood)
router.get('/single-food/:foodId', singleFood)

const hotelRouter = router
module.exports = { hotelRouter }