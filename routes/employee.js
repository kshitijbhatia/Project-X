const express = require('express')

const router = express.Router()

const { getEmployeeData, addEmployee, editEmployeeData, deleteEmployeeData } = require('../controllers/employee')

router.get('/data', getEmployeeData)
router.post('/add', addEmployee)
router.put('/edit', editEmployeeData)
router.delete('/delete', deleteEmployeeData)

module.exports = router;