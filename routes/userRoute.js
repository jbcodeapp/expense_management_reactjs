const express = require('express')
const { loginController, registerController, changePasswordController } = require('../controllers/userController')

//route object
const router = express.Router()

//routers
//POST || LOGIN USER
router.post('/login', loginController )

//POST || REGISTER USER
router.post('/register', registerController )

//POST || REGISTER USER
router.post('/_id/changePass', changePasswordController )



module.exports = router ;