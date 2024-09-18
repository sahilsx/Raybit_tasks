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
 const cors = require("cors")
 const app = express();
 const port = 4000;
 app.use(express.json())
 app.use(bodyParser.json())
app.use(cors())
 Db();

 app.use("/api/product", postRouter);

 app.listen(port, console.log(`server conected on localhost : ${port} `));
