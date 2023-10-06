const app = require('./app') 
const connectToMongo = require('./config/database')

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
require("dotenv").config({path: 'backend/config/config.env'})
}

connectToMongo();


const server= app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`)
})


// handling uncaught exceptions  --> always written at the top
process.on("uncaughtException",(err)=>{
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to uncaught exceptions `)
 
  server.close(()=>{  
   process.exit(1)
  })
 
})






// Unhandled Promise rejections 
process.on("unhandledRejection",(err)=>{
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to unhandled  promise rejection`)
 
  server.close(()=>{
   process.exit(1)
  })

})

