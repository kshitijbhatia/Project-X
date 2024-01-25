const Sequelize = require('sequelize')

const sequelize = new Sequelize('project_x', 'root', 'Kritika5!',{
    host : 'localhost',
    dialect : 'mysql'
})

module.exports = sequelize;