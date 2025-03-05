const express = require('express')
const { upload } = require('../middlewares/multer')
const { adminSignup, adminLogin, checkAdmin, adminLogout, adminProfile, adminProfilePicUpdate, getAllUser, activeUserStatus, blockUserStatus } = require('../controllers/adminController')
const { adminAuth } = require('../middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log("Routes: admin")
    next()
})


router.post('/signup', adminSignup)
router.post('/login', adminLogin)

router.post('/logout', adminAuth, adminLogout)
router.get('/check-admin', adminAuth, checkAdmin)
router.get('/get-all-user', adminAuth, getAllUser)
router.put('/active-user', adminAuth, activeUserStatus)
router.put('/block-user', adminAuth, blockUserStatus)

router.get('/profile', adminAuth, adminProfile)
router.put('/reset-password')
router.put('/update-profile')
router.put('/update-profile-pic', adminAuth, upload.single('image'), adminProfilePicUpdate)

const adminRouter = router
module.exports = { adminRouter }