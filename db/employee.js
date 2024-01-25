const Sequelize = require('sequelize')

const sequelize = require('./connect')

const Employee = sequelize.define('employee', {
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    first_name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    last_name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    employeeId : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    number : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
})

module.exports = Employee;