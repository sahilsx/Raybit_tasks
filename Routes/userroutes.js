
const UserRouter = require("express").Router();

const {
    signHandler,
    loginHandler,
    getusers
} = require("../controller/usercontroller/user"); 


UserRouter.post("/signup", signHandler);   
UserRouter.post("/login", loginHandler);   
UserRouter.get("/get", getusers);          

module.exports = UserRouter;
