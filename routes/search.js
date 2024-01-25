const express = require('express')

const router = express.Router()

const { searchEmployeeData } = require('../controllers/search')

router.post('/', searchEmployeeData)

module.exports = router;