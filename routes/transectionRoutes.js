const express = require('express')
const { addTransection, getAllTransection } = require('../controllers/transectionCtrl')

//route object
const router = express.Router()

//routes
//add transection POST method
router.post('/add-transections', addTransection)

//get transection
router.post('/get-transections', getAllTransection)


module.exports = router