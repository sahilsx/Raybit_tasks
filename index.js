

const express = require ("express");
const Db = require("./utils/mongo");
 const postRouter=require("./Routes/postroutes")
 const bodyParser =require("body-parser")
 const morgan = require("morgan")
 const cors = require("cors");
 const dotenv = require("dotenv").config();

const CrudRouter = require("./Routes/crudroutes");
const UserRouter = require("./Routes/userroutes");
 const app = express();
 const port = process.env.PORT;
 app.use(express.json())
 app.use(bodyParser.json({
    
 }))
 app.use(morgan('dev'))
app.use(cors(
 
  
))
 Db();
 app.use("/user",UserRouter)
 app.use("/crud",CrudRouter)
 app.use("/product", postRouter);

 app.listen(port, console.log(`server conected on localhost : ${port} `));
