// import usefull packages
const express = require("express")
require('dotenv').config()

//import models
const db = require("./models/index.js")

const {items, users} = db

// import middlewares
const authMiddleware = require('./middleware/auth')

//import controllers
const UserController = require("./controllers/userController")
const ItemsController = require("./controllers/itemsController")

//initialize controllers
const usersController = new UserController(users)
const itemsController = new ItemsController(items)

//import routers
const ItemsRouter = require("./routers/itemsRouter")
const UsersRouter = require("./routers/usersRouter")

//initialize routers
const usersRouter = new UsersRouter(usersController, authMiddleware).routes()
const itemsRouter = new ItemsRouter(itemsController).routes()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/users", usersRouter)

// app.use(authMiddleware)

app.use("/items", itemsRouter)



const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{console.log(`App listening on port ${PORT}`)})