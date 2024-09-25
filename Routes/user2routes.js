const UUserRoutes = require('express').Router();

const{
    UsersHandler,
    LoginHandler,
    forgotPasswordHandler
}=require('../controller/usercontroller/user2');


UUserRoutes.post('/signup', UsersHandler);
UUserRoutes.post('/login', LoginHandler);
UUserRoutes.post('/forgot-password', forgotPasswordHandler);
module.exports = UUserRoutes;