const express=require('express')
const app=express();
const cors=require('cors');
require('dotenv').config({path:"./config.env"});

const port=5000;
//use middleware
app.use(cors());
app.use(express.json());


//mongodb connection

const con=require('./db/connection.js')
//using routes

app.use(require('./routes/route'))

con.then(db=>{
    if(!db)return process.exit(1)

    //listen to the http server
    app.listen(port,()=>{
        console.log(`server is running on port :${port}`)
    })

    app.on('error',err=>console.log(`Failed to connect with HTTP server:${err}`))
    //error in mongodb connection
}).catch(error=>{
    console.log(`Connection Failed...!${err}`)
})

// app.listen(port,()=>{
//     console.log(`server is running on port :${port}`)
// })