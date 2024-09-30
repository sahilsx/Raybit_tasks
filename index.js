
const express = require ("express");
const Db = require("./utils/mongo");
 const postRouter=require("./Routes/postroutes")
 const bodyParser =require("body-parser")
 const morgan = require("morgan")
 const cors = require("cors");
 const dotenv = require("dotenv").config({path: "./.env"});
 const {sequelize,connectToDatabase} = require("./utils/mysql");
 const AdminRoutes = require("./Routes/adminroutes");
const CrudRouter = require("./Routes/crudroutes");
const UserRouter = require("./Routes/userroutes");
const UUserRoutes = require("./Routes/user2routes");
 const app = express();
 const port = process.env.PORT;






 app.use(express.json())
 app.use(bodyParser.json({  
    limit: '50mb'
 }))
 app.use(morgan('dev'))
app.use(cors())
connectToDatabase();
Db();







 app.use("/user",UserRouter)
 app.use("/crud",CrudRouter)
 app.use("/product", postRouter);
 app.use("/user2", UUserRoutes)
 app.use("/admin", AdminRoutes)

 app.listen(port, console.log(`server conected on localhost : ${port} `));
