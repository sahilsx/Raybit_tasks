// const  UserRouter = require("express").Router();

// const{
//     signHandler,
//     loginHandler,
//     getusers
// }=require("../controller/usercontroller/user"); 

// UserRouter.route("/",signHandler)
//            .post("/signup",signHandler)
//            .post("/login",loginHandler)
//            .get("/get",getusers)



// module.exports = UserRouter;
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
