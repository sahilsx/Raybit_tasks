const UUserRoutes = require('express').Router();

const{
    UsersHandler,
    LoginHandler,
    ForgotPasswordHandler
}=require('../controller/usercontroller/user2');


UUserRoutes.post('/signup', UsersHandler);
UUserRoutes.post('/login', LoginHandler);
UUserRoutes.post('/forgot-password', ForgotPasswordHandler);
module.exports = UUserRoutes;