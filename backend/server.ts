import { Request, Response } from "express";

require('dotenv').config(); // pulls our environemnt variables in

const express = require('express'); //our middleware router
const app = express(); 

const cors = require('cors'); //helps avoid CORS issues 
const port = process.env.PORT || 5000; //pulls environemnt port or uses default 5000

app.use(cors());
app.use(express.json());



//Initializes 5 connections that can be used in the project. Just a threadpool
const mysql = require('mysql');
var connectionPool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.SCHEMA || 'root',
    debug: false

})


//Routes requests to these files
const registrationRouter = require("./routes/registrationRouter");
const loginRouter = require("./routes/loginRouter");

//connects router to url 
app.use("/register", registrationRouter)
app.use("/login", loginRouter) 


app.get('/', (req: Request, res: Response) => {
    res.send("Backend successfuly reached")
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})



//Exports our connection pool to use in our project
module.exports = connectionPool;