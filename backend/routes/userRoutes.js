const express = require('express')
const { userSignup, userLogin, checkUser, userLogout, userProfile, userProfilePicUpdate } = require('../controllers/userController')
const { userAuth } = require('../middlewares/userAuth')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: user')
    next()
})

router.post('/signup', userSignup)
router.post('/login', userLogin)

router.post('/logout', userAuth, userLogout)
router.get('/check-user', userAuth, checkUser)

router.get('/profile', userAuth, userProfile)
router.put('/reset-password')
router.put('/update-profile')
router.put('/update-profile-pic', userAuth, upload.single('image'), userProfilePicUpdate)

const userRouter = router
module.exports = { userRouter }