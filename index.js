// const express = require ("express");
// const Db = require("./utils/mongo");
// const PostHandler = require("./controller/post")
// const DeleteHandler = require("./controller/delete");
// const UpdateHandler = require("./controller/update");
// const ReadHandler = require("./controller/read");
// const GetallHandler = require("./controller/getall");
// const app = express();
// const port = 4000;
// app.use(express.json())
// Db();
// app.get("/",(req,res)=>{
// res.send("Welcome InterNoO")
// })
// app.post('/create', PostHandler)
// app.delete('/delete', DeleteHandler)
// app.put("/update",UpdateHandler)
// app.get("/get",ReadHandler)
// app.get("/getall",GetallHandler)

// app.listen(port, console.log(`server conected on localhost : ${port} `));







const express = require ("express");
const Db = require("./utils/mongo");
 const postRouter=require("./Routes/postroutes")
 const bodyParser =require("body-parser")
 const morgan = require("morgan")
 const cors = require("cors");
const {signHandler,loginHandler} = require("./controller/logincontroller/login");
 const app = express();
 const port = 4000;
 app.use(express.json())
 app.use(bodyParser.json({
    extended: true,
    limit :"50mb"
 }))
 app.use(morgan('dev'))
app.use(cors({
 origin :"http://localhost:5173" || "*",
 methods:["GET","PUT","DELETE","POST"],
 credentials:true,
}
  
))
 Db();
  app.post("/signup",signHandler)
  app.post("/login",loginHandler)
//  app.use("/api/product", postRouter);

 app.listen(port, console.log(`server conected on localhost : ${port} `));
