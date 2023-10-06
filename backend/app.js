const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
const errorMiddleware = require('./middleware/error')
app.use(express.json())

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())


//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path: 'backend/config/config.env'})
    }

// Route Imports
const job = require('./routes/jobRoute')
const user = require('./routes/userRoute')

app.use('/api/v1',user)
app.use('/api/v1',job)

app.use(express.static(path.join(__dirname,'../build')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../build/index.html'))

})

//Middleware for errors
app.use(errorMiddleware)


module.exports = app