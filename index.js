// Loads .env file contents into process.env by default
// config() - it is a method
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
require('./DB/connection')

const pfServer =express()
pfServer.use(cors())
// cors()-for data sharing
// routes only after cors()
// parse before router (express.json())
pfServer.use(express.json()) 
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))


const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project fair server started at port: ${PORT}`);
})
// listen - to host

pfServer.get('/',(req,res)=>{
    res.status(200).send("<h1 style=color:red;>Project fair server started!!! Waiting for Client Request...</h1>")
})
// get req is must to see something in browser
// / it is base url which is localhost:3000