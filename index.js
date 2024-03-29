require('dotenv').config()    //to import dotenv
const express = require("express")
const mongoose= require("mongoose")

const { register, login, findUser } = require("./src/Controllers/auth")
const cors = require("cors")
const { verifyToken, validateForm, isValidated } = require("./src/Middlewares")
const { addForm } = require('./src/Controllers/Form')
const { sendEmail } = require('./src/Helper/Email')

const http =require("http")
const {Server} = require ("socket.io")


const server = express()
const app = http.createServer(server)
const io = new Server(app)


server.use(express.json())
server.use(cors())
server.get("/",(req,res)=>{


//    res.send("Success")
    res.status(200).json({
        name:"kirti",
        age:4
    })
})
// server.post("/register",(req,res)=>{
//     const{ name, phoneNumber ,email } = req.body
//     const _user = new users(req.body)
// _user.save()
//console.log(req.body)
// })

server.post("/register",register,sendEmail)
server.post("/login",login)

server.get("/get-user",verifyToken,findUser)
server.post("/add-form",validateForm,isValidated,addForm,sendEmail)





io.on("connection",socket =>{
    console.log("new user connected");
    socket.on("message",(message,room)=>{
      console.log(`new message recieved in ${room} and message is ${message}`);
      socket.to(room).emit("message",message)
    })
  
    socket.on("join",(room)=>{
      console.log(room);
      socket.join(room)
      socket.emit("joined")
    })
  })
 app.listen("3000")
// for connecting database 
mongoose.connect("mongodb://localhost:27017/tesqqq").then(()=>{
    console.log("Database Connected")
}).catch((error)=>{
    console.log(error)
})
