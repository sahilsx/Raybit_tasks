const CrudRouter = require("express").Router();



const{
PostHandler,
GetallHandler,
UpdateHandler,
DeleteHandler
}=require("../controller/postcontroller/crud")

CrudRouter.route("/")
  .post(PostHandler)     
  .get(GetallHandler)  
  .put(UpdateHandler) 
  .delete(DeleteHandler)




  module.exports =CrudRouter;