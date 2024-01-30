const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db/connect')
const Employee = require('./db/employee')
const User = require('./db/user')

const app = express()
const PORT = 5000

const corsOption = {
    origin : 'http://localhost:3000',
    credentials : true
}

app.use(cookieParser())
app.use(cors(corsOption))
app.use(express.urlencoded({extended : true}))
app.use(express.json())


const EmployeeRouter = require('./routes/employee')
const SearchRouter = require('./routes/search')
const UserRoute = require('./routes/user')
const { restrictToLoggedInUserOnly } = require('./service/restrictUser')


app.use('/search', SearchRouter)
app.use('/user', UserRoute)
app.use('/',  restrictToLoggedInUserOnly ,EmployeeRouter)

const startServer = async () =>{
    try{
        const connection = await sequelize.sync()
        app.listen(PORT, ()=>{
            console.log(`Server Listening on PORT: ${PORT}`)
        })
    }catch(err){
        console.log("Error connecting to DB!!")
    }
}

startServer();