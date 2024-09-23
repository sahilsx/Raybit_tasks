
const postRouter = require("express").Router();


const{
    TaskAddHandler,
    getmytasks
}=require("../controller/taskcontroller/mytasks")



postRouter.route("/")
     .post(TaskAddHandler)
     .get(getmytasks)




module.exports=postRouter;