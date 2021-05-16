import { Request, Response } from "express";

require('dotenv').config(); // pulls our environemnt variables in

const express = require('express'); //our middleware router
const app = express();

const cors = require('cors'); //helps avoid CORS issues 
const port = process.env.PORT || 5000; //pulls environemnt port or uses default 5000



app.use(cors());



app.use(express.json());

//Initializes the connection pool
var pool = require('./connectionPool');


//Routes requests to these files
const registrationRouter = require("./routes/registrationRouter");
const loginRouter = require("./routes/loginRouter");
const eventRouter = require("./routes/eventRouter");
const profileRouter = require("./routes/profileRouter");

//connects router to url 
app.use("/register", registrationRouter)
app.use("/login", loginRouter)
app.use("/event", eventRouter)
app.use("/profile", profileRouter)


app.get('/', (req: Request, res: Response) => {
    res.send("Backend successfuly reached")
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
