const postRouter = require("express").Router();



const{
PostHandler,
ReadHandler,
GetallHandler,
UpdateHandler,
DeleteHandler
}=require("../controller/all")

postRouter.route("/")
  .post(PostHandler)     
  .get(GetallHandler)  
  .put(UpdateHandler) 
  .delete(DeleteHandler)


// postRouter.route("/:id")
//   .get(ReadHandler)      
//   .put(UpdateHandler) 
//   .delete(DeleteHandler);

  module.exports = postRouter;