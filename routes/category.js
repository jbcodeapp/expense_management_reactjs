const express = require('express')
const { addCategory, allCategory, editCategory, deleteCategory } = require('../controllers/categoryCtrl')

//route object
const router = express.Router()

//routes
//add category POST method
router.post('/add-category', addCategory)

//Edit category POST method
router.post('/edit-category', editCategory)

//Delete category POST method
router.post('/delete-category', deleteCategory)

//get category
router.post('/get-category', allCategory)


module.exports = router ;