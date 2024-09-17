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
  .get(GetallHandler); 

postRouter.route("/:id")
  .get(ReadHandler)      
  .patch(UpdateHandler) 
  .delete(DeleteHandler);

  module.exports = postRouter;